const http = require("http");
const port = 3000;
const fs = require("fs");

const renderHTML = (data, res) => {
   res.writeHead(200, {
      "Content-Type": "text/html",
   });
   fs.readFile(data, (err, data) => {
      if (err) {
         res.writeHead(404);
         res.write("Error file not found");
      } else {
         res.write(data);
      }
      res.end();
   });
};
http
   .createServer((req, res) => {
      const url = req.url;
      switch (url) {
         case "/about":
            renderHTML("./about.html", res);
            break;
         case "/contact":
            renderHTML("./contact.html", res);
            break;
         default:
            renderHTML("./index.html", res);
            break;
      }
   })
   .listen(port, () => {
      console.log(`Server is listening at ${port}`);
   });
