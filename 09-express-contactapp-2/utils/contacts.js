const fs = require("fs");
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
const findContact = (nama) => {
   const contacts = loadContact();
   const contact = contacts.find(
      (kontak) => kontak.nama.toLowerCase() === nama.toLowerCase()
   );
   return contact;
};

const saveContacts = (contacts) => {
   fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
};
// menambahkan contact
const addContact = (contact) => {
   const contacts = loadContact();
   contacts.push(contact);
   saveContacts(contacts);
};

// cek duplikat
const cekDuplikat = (nama) => {
   const contacts = loadContact();
   return contacts.find((contact) => contact.nama === nama);
};
module.exports = {
   loadContact,
   findContact,
   cekDuplikat,
   addContact,
};
