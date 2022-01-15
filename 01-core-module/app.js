// import fs (filesystem) in core module
const fs = require("fs");
const { stdin, stdout } = require("process");

// write file synchronous
// //fs.writeFileSync("text.txt", `What'up Nodee`);
// write file asynchronous
// //`fs.writeFile("text.txt", "you man", (e) => {
//  //  console.log(e);
// //`});

// read file synchronous
// //const file = fs.readFileSync("text.txt", "utf-8");
// //console.log(file);
// read file asynchronous
// //fs.readFile("text.txt", "utf-8", (e, data) => {
//  //  if (e) throw e;
//  //  console.log(data);
// //});

const readline = require("readline");
const rl = readline.createInterface({
   input: stdin,
   output: stdout,
});
rl.question("What is your name boi ? ", (name) => {
   // console.log("thanks");
   rl.question("Your phone number here = ", (phone) => {
      const contact = { name, phone };
      const file = fs.readFileSync("data/contacts.json", "utf-8");
      const contacts = JSON.parse(file);

      contacts.push(contact);
      fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 2));
      console.log(`Thats cool, Thanks kid`);
      rl.close();
   });
});
