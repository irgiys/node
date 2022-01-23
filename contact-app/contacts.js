const fs = require("fs");
const readline = require("readline");

const rl = readline.Interface({
   input: process.stdin,
   output: process.stdout,
});

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
   fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
   fs.writeFileSync(dataPath, "[]", "utf-8");
}

const tulisPertanyaan = (pertanyaan) => {
   return new Promise((resolve, rejects) => {
      rl.question(pertanyaan, (nanya) => {
         resolve(nanya);
      });
   });
};

const simpanPertanyaan = (nama, email, noHP) => {
   const contact = { nama, email, noHP };
   const file = fs.readFileSync(dataPath);
   const contacts = JSON.parse(file);

   contacts.push(contact);
   fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
   console.log("Thankss ^^");
   rl.close();
};
module.exports = {
   tulisPertanyaan,
   simpanPertanyaan,
};
