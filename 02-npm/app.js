const validator = require("validator");
const chalk = require("chalk");
// import validator from "validator";

// console.log(validator.isEmail("Irgiyansya@gmail.co"));
// console.log(validator.isMobilePhone("089506630849", "id-ID"));
// console.log(validator.isNumeric("08048120"));
// console.log(chalk.italic.black.bgRedBright("Hello wolrd"));
const nama = "irgiyansyah";
const pesan = chalk`Lorem ipsum dolor {italic.bgRed.black sit amet} {bgBlue.black consectetur adipisicing} elit. Numquam,  rerum!. Nama saya :{bgCyan.black ${nama}}`;
console.log(pesan);
