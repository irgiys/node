const fs = require("fs");

const readline = require("readline");
const { stdin, stdout } = require("process");

const rl = readline.Interface({
   input: stdin,
   output: stdout,
});

// membuat folder data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
   fs.mkdirSync(dirPath);
}

// membuat file contacts.json
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
   fs.writeFileSync(dataPath, "[]", "utf-8");
}
const tulisPertanyaan = (pertanyaan) => {
   return new Promise((resolve, reject) => {
      rl.question(pertanyaan, (nama) => {
         resolve(nama);
      });
   });
};
const simpanPertanyaan = (nama, email, noHP) => {
   const contact = { nama, email, noHP };
   const file = fs.readFileSync("./data/contacts.json", "utf-8");
   const contacts = JSON.parse(file);
   contacts.push(contact);

   fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts, null, 2));
   console.log("Terimakasih ^^");
   rl.close();
};

module.exports = {
   tulisPertanyaan,
   simpanPertanyaan,
};
