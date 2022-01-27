const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
   res.sendFile("./index.html", { root: __dirname });
   // res.json({
   //    nama: "irgiyansyah",
   //    email: "irgiyansy@gmail.com",
   // });
});
app.get("/about", (req, res) => {
   res.sendFile("./about.html", { root: __dirname });
});
app.get("/contact", (req, res) => {
   res.sendFile("./contact.html", { root: __dirname });
});
app.get("/product/:id", (req, res) => {
   res.send(
      `Product ID: ${req.params.id} <br> Category : ${req.query.category}`
   );
});
app.use("/", (req, res) => {
   res.send("tesst");
});
app.listen(port, () => {
   console.log(`Server listening at http://localhost:${port}...`);
});
