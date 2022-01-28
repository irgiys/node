const express = require("express");
const expressLayout = require("express-ejs-layouts");
const app = express();
const port = 3000;
app.use(expressLayout);

app.set("view engine", "ejs");
app.get("/", (req, res) => {
   // res.sendFile("./index.html", { root: __dirname });
   const nama = "irgi";
   const mahasiswa = [
      { nama: "Irgiyansyah", email: "Irgiyansya@gmail.com" },
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
   res.render("contact", {
      layout: "layouts/main-layout",
      title: "Halaman Contact",
   });
});
app.get("/test", (req, res) => {
   res.send("tesstttt");
});
app.get("/json", (req, res) => {
   res.json({
      nama: "Irgiyansyah",
      email: "Irgiyansy@gmail.com",
   });
});
app.get("/product/:id", (req, res) => {
   res.send(`Product ID : ${req.params.id}`);
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
