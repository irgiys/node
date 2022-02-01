const express = require("express");
const expressLayout = require("express-ejs-layouts");
const {
   loadContact,
   findContact,
   addContact,
   cekDuplikat,
   deleteContact,
   updateContacts,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const port = 3000;

app.use(expressLayout);
// third party middleware
app.set("view engine", "ejs");
// express middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
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
// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
   session({
      cookie: { maxAge: 6000 },
      secret: "secret",
      resave: true,
      saveUninitialized: true,
   })
);
app.use(flash());

app.get("/about", (req, res) => {
   res.render("about", {
      layout: "layouts/main-layout",
      title: "Halaman About",
   });
});

app.get("/contact", (req, res) => {
   const contacts = loadContact();
   res.render("contact", {
      layout: "layouts/main-layout",
      title: "Halaman Contact",
      contacts,
      msg: req.flash("msg"),
   });
});
// halaman form tambah data contact
app.get("/contact/add", (req, res) => {
   res.render("add-contact", {
      layout: "layouts/main-layout",
      title: "Form add contact",
   });
});
// prosess tambah data
app.post(
   "/contact",
   [
      body("nama").custom((value) => {
         const duplikat = cekDuplikat(value);
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
         // console.log(req.body);
         addContact(req.body);
         // kirimkan flash
         req.flash("msg", `Data berhasil ditambahkan!`);
         res.redirect("/contact");
      }
   }
);

// proses delete contact
app.get("/contact/delete/:nama", (req, res) => {
   const contact = findContact(req.params.nama);

   // jika contact tidak ada
   if (!contact) {
      res.status(404);
      res.send("404");
   } else {
      deleteContact(req.params.nama);
      req.flash("msg", `Data berhasil dihapus!`);
      res.redirect("/contact");
   }
});

// form ubah data contact
app.get("/contact/edit/:nama", (req, res) => {
   const contact = findContact(req.params.nama);

   res.render("edit-contact", {
      layout: "layouts/main-layout",
      title: "Form Ubah data contact",
      contact,
   });
});
// prosess ubah data
app.post(
   "/contact/update",
   [
      body("nama").custom((value, { req }) => {
         const duplikat = cekDuplikat(value);
         if (value != req.body.oldNama && duplikat) {
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
         res.render("edit-contact", {
            layout: "layouts/main-layout",
            title: "Form ubah contact",
            errors: error.array(),
            contact: req.body,
         });
      } else {
         // res.send(req.body);
         // console.log(req.body);
         updateContacts(req.body);
         // kirimkan flash
         req.flash("msg", `Data berhasil diubah!`);
         res.redirect("/contact");
      }
   }
);

// halaman detail contact
app.get("/contact/:nama", (req, res) => {
   const contact = findContact(req.params.nama);
   res.render("detail", {
      layout: "layouts/main-layout",
      title: "Halaman Contact",
      contact,
   });
});

// not found
app.use("/", (req, res) => {
   res.status(404);
   res.send("404");
});

// listen
app.listen(port, () => {
   console.log(`Server is lesting at http://localhost:${port}`);
});
