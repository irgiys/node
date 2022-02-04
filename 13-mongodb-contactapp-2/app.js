const express = require("express");
const expressLayouts = require("express-ejs-layouts");
// express validator
const { body, validationResult, check } = require("express-validator");
// export flash
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
// method override
const methodOverride = require("method-override");
// panggil db
const Contact = require("./model/contact");
require("./utils/db");

const app = express();
const port = 3000;

// set up ejs
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// set up flash
app.use(cookieParser("secret"));
// set up method-override
app.use(methodOverride("_method"));

app.use(
   session({
      cookie: { maxAge: 6000 },
      secret: "secret",
      resave: true,
      saveUninitialized: true,
   })
);
app.use(flash());
// halaman home
app.get("/", (req, res) => {
   // res.sendFile("./index.html", { root: __dirname });
   const nama = "irgi";
   res.render("index", {
      nama,
      kelas: "Malam B",
      layout: "layouts/main-layout",
      title: "Halaman Home",
   });
});

// halaman about
app.get("/about", (req, res) => {
   res.render("about", {
      layout: "layouts/main-layout",
      title: "Halaman About",
   });
});

// halaman contact
app.get("/contact", async (req, res) => {
   const contacts = await Contact.find();
   // res.send(contacts);
   res.render("contact", {
      layout: "layouts/main-layout",
      title: "Halaman Contact",
      contacts,
      msg: req.flash("msg"),
   });
});

// halaman add contact
app.get("/contact/add", (req, res) => {
   res.render("add-contact", {
      layout: "layouts/main-layout",
      title: "Form add contact",
   });
});

// proses tambah contact
app.post(
   "/contact",
   [
      body("nama").custom(async (value) => {
         const duplikat = await Contact.findOne({ nama: value });
         if (duplikat) {
            throw new Error("Nama sudah digunakan!");
         }
         return true;
      }),
      check("email", "Email tidak valid").isEmail(),
      check("nohp", "Nomor HP tidak valid").isMobilePhone("id-ID"),
   ],
   (req, res) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
         // return res.status(400).json({ error: error.array() });
         res.render("add-contact", {
            layout: "layouts/main-layout",
            title: "Form add contact",
            errors: error.array(),
         });
      } else {
         Contact.insertMany(req.body, (error, result) => {
            // kirimkan flash
            req.flash("msg", `Data berhasil ditambahkan!`);
            res.redirect("/contact");
         });
      }
   }
);

// halaman delete contact
app.delete("/contact", (req, res) => {
   // console.log(nami);
   Contact.deleteOne({ nama: req.body.nama }).then(() => {
      req.flash("msg", `Data ${req.body.nama} berhasil dihapus!`);
      res.redirect("/contact");
   });
});

// halaman edit contact
app.get("/contact/edit/:nama", async (req, res) => {
   const contact = await Contact.findOne({ nama: req.params.nama });

   res.render("edit-contact", {
      layout: "layouts/main-layout",
      title: "Form Ubah data contact",
      contact,
   });
});
// proses edit contact
app.put(
   "/contact",
   [
      body("nama").custom(async (value, { req }) => {
         const duplikat = await Contact.findOne({ nama: value });
         if (value != req.body.oldNama && duplikat) {
            throw new Error("Nama contact sudah digunakan!");
         }
         return true;
      }),
      check("email", "Email tidak valid").isEmail(),
      check("nohp", "Nomor HP tidak valid").isMobilePhone("id-ID"),
   ],
   (req, res) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
         res.render("edit-contact", {
            layout: "layouts/main-layout",
            title: "Form ubah contact",
            errors: error.array(),
            contact: req.body,
         });
      } else {
         Contact.updateOne(
            { _id: req.body._id },
            {
               $set: {
                  nama: req.body.nama,
                  email: req.body.email,
                  nohp: req.body.nohp,
               },
            }
         ).then((result) => {
            req.flash("msg", `Data berhasil diubah!`);
            res.redirect("/contact");
         });
      }
   }
);
// halaman detail contact
app.get("/contact/:nama", async (req, res) => {
   const contact = await Contact.findOne({ nama: req.params.nama });
   res.render("detail", {
      layout: "layouts/main-layout",
      title: "Halaman Contact",
      contact,
   });
});

app.listen(port, () => {
   console.log(`MongoDB Contact app | is listen to http://localhost:${port}`);
});
