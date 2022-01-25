const http = require("http");
const fs = require("fs");
const port = 3000;

const renderHTML = (file, res) => {
   fs.readFile(file, (error, data) => {
      if (error) {
         res.writeHead(404);
         res.write("Error file not found");
      } else {
         res.write(data);
      }
      res.end();
   });
   res.writeHead(200, {
      "Content-Type": "text/html",
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
      console.log(`Server is listening on port ${port}...`);
   });
