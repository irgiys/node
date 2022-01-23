const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
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
   const duplikat = contacts.find((contact) => contact.nama === nama);
   if (duplikat) {
      console.log(
         chalk.red.inverse.bold("Contact sudah terdaftar gunakan nama lain!")
      );
      return false;
   }
   // cek email
   if (email) {
      if (!validator.isEmail(email)) {
         console.log(chalk.red.inverse.bold("Email tidak valid!"));
         return false;
      }
   }
   // cek no hp
   if (!validator.isMobilePhone(noHP, "id-ID")) {
      console.log(chalk.red.inverse.bold("Nomor hp tidak valid!"));
      return false;
   }
   contacts.push(contact);
   fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
   console.log(chalk.green.inverse.bold("Thankss ^^"));
};
module.exports = {
   simpanPertanyaan,
};
