const fs = require("fs");
const validator = require("validator");
const chalk = require("chalk");
const dirPath = "./data";

if (!fs.existsSync(dirPath)) {
   fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
   fs.writeFileSync(dataPath, "[]", "utf-8");
}

const simpanPertanyaan = (nama, email, noHP) => {
   const contact = { nama, email, noHP };
   const file = fs.readFileSync(dataPath);
   const contacts = JSON.parse(file);

   // cek duplikat
   for (const avaible of contacts) {
      if (avaible.nama === nama) {
         console.log(chalk.red.inverse.bold("Nama sudah ada"));
         return false;
      }
      if (avaible.email === email) {
         console.log(chalk.red.inverse.bold("Email sudah ada"));
         return false;
      }
      if (avaible.noHP === noHP) {
         console.log(chalk.red.inverse.bold("Nomor handphone sudah ada"));
         return false;
      }
   }

   // cek email valid kah
   if (email) {
      if (!validator.isEmail(email)) {
         console.log(chalk.red.inverse.bold("Email salah!"));
         return false;
      }
   }

   // cek nohp valid kah
   if (!validator.isMobilePhone(noHP, "id-ID")) {
      console.log(chalk.red.inverse.bold("Nomor Handphone salah!"));
      return false;
   }
   contacts.push(contact);
   fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
   console.log(chalk.green.inverse.bold("Thankss ^^"));
};
module.exports = {
   simpanPertanyaan,
};
