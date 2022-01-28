const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
   res.sendFile("./index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
   res.sendFile("./about", { root: __dirname });
});
app.get("/contact", (req, res) => {
   res.sendFile("./contact", { root: __dirname });
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
