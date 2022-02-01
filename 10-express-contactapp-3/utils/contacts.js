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

// hapus contact
const deleteContact = (nama) => {
   const contacts = loadContact();
   const fileteredContacts = contacts.filter((contact) => contact.nama != nama);
   // console.log(fileteredContacts);
   saveContacts(fileteredContacts);
};

// untuk mengubah contact
const updateContacts = (contactBaru) => {
   const contacts = loadContact();
   // hilangkan contact lama yang namanya sama dengan oldNama
   const fileteredContacts = contacts.filter(
      (contact) => contact.nama != contactBaru.oldNama
   );
   // console.log(fileteredContacts, contactBaru);
   delete contactBaru.oldNama;
   fileteredContacts.push(contactBaru);
   saveContacts(fileteredContacts);
};
module.exports = {
   loadContact,
   findContact,
   cekDuplikat,
   addContact,
   deleteContact,
   updateContacts,
};
