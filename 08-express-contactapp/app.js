const express = require("express");
const expressLayout = require("express-ejs-layouts");
const { loadContact, findContact } = require("./contacts");
const app = express();
const port = 3000;
app.use(expressLayout);

// third party middleware
app.set("view engine", "ejs");
// express middleware
app.use(express.static("public"));
app.get("/", (req, res) => {
   // res.sendFile("./index.html", { root: __dirname });
   const nama = "irgi";
   const mahasiswa = [
      {
         nama: "Irgiyansyah",
         email: "Irgiyansya@gmail.com",
      },
      {
         nama: "Adit wibu",
         email: "aditwibu@gmail.com",
      },
      {
         nama: "permana wibu",
         email: "permanawibu@gmail.com",
      },
   ];
   res.render("index", {
      nama,
      kelas: "Malam B",
      layout: "layouts/main-layout",
      title: "Halaman Home",
      mahasiswa,
   });
});
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
   });
});
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
