const fs = require("fs");

/// buat file secara synchronous
// fs.writeFileSync("test.txt", "Hello core module");

// // secara asynchronous
// fs.writeFile("test.txt", "create file secara asynchronous", (e) => {
//    if (e) throw e;
//    console.log("The file has been created");
// });

// membaca isi file synchronous
// console.log(fs.readFileSync("test.txt", "utf-8"));

// secara asynchronous
// fs.readFile("test.txt", "utf-8", (err, data) => {
//    if (err) throw err;
//    console.log(data);
// });

// readline dari inputan di terminal
const readline = require("readline");
// console.log(readline);
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});
rl.question("What is your name ? ", (nama) => {
   // add multiple question
   rl.question("Your phone number = ", (noHP) => {
      // console.log(`Thank you ${nama}, your phone number ${noHP}`);
      const contact = { nama, noHP };
      const file = fs.readFileSync("data/contacts.json", "utf8");
      const contacts = JSON.parse(file);
      contacts.push(contact);
      fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 2));
      console.log(`Thanks for the data ${nama}`);
      rl.close();
   });
});
