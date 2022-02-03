const express = require("express");
const expressLayouts = require("express-ejs-layouts");
// export flash
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
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
