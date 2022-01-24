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

const loadContact = () => {
   const file = fs.readFileSync(dataPath);
   const contacts = JSON.parse(file);
   return contacts;
};

const simpanPertanyaan = (nama, email, noHP) => {
   const contact = { nama, email, noHP };
   const contacts = loadContact();

   // cek duplikat
   for (const avaible of contacts) {
      if (avaible.nama === nama) {
         console.log(chalk.red.inverse.bold("Nama sudah ada"));
         return false;
      }
      if (avaible.email) {
         if (avaible.email === email) {
            console.log(chalk.red.inverse.bold("Email sudah ada"));
            return false;
         }
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
   console.log(chalk.green.inverse.bold("Data sudah ditambahkan ^^"));
};

// fungsi list daftar kontak
const listContact = () => {
   const contacts = loadContact();
   contacts.forEach((element, i) => {
      console.log(`${i + 1}. ${element.nama} - ${element.noHP}`);
   });
};

// fungsi menampilkan detail kontak berdasarkan nama
const detailContact = (nama) => {
   const contacts = loadContact();
   const contact = contacts.find(
      (kontak) => kontak.nama.toLowerCase() === nama.toLowerCase()
   );
   if (!contact) {
      console.log(chalk.red.inverse.bold(`Nama tidak ditemukan`));
      return false;
   }
   contact.email
      ? console.log(
           chalk.green.inverse.bold(
              `${contact.nama} - ${contact.noHP} - ${contact.email}`
           )
        )
      : console.log(
           chalk.green.inverse.bold(`${contact.nama} - ${contact.noHP}`)
        );
};
const deleteContact = (nama) => {
   const contacts = loadContact();
   const newContacts = contacts.filter(
      (kontak) => kontak.nama.toLowerCase() != nama.toLowerCase()
   );
   if (contacts.length === newContacts.length) {
      console.log(chalk.red.inverse.bold("Nama tidak ditemukan"));
      return false;
   }
   fs.writeFileSync(dataPath, JSON.stringify(newContacts, null, 2));
   console.log(chalk.green.inverse.bold("Data sudah dihapus ^^"));
};
module.exports = {
   simpanPertanyaan,
   listContact,
   detailContact,
   deleteContact,
};
