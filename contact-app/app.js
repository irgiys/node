// mengambil argument dari command line
const yargs = require("yargs");
const { simpanPertanyaan } = require("./contacts");

yargs.command({
   command: "add",
   describe: "Nambihan Kontak",
   builder: {
      nama: {
         describe: "Namana saha ?",
         demandOption: true,
         type: "string",
      },
      email: {
         describe: "Email",
         demandOption: false,
         type: "string",
      },
      noHP: {
         describe: "Nomber Handphone",
         demandOption: true,
         type: "string",
      },
   },
   handler(argv) {
      simpanPertanyaan(argv.nama, argv.email, argv.noHP);
   },
});
yargs.parse();
