// mengambil argument dari command line
const yargs = require("yargs");
const { simpanPertanyaan } = require("./contacts");

yargs.command({
   command: "add",
   describe: "Menambahkan contact baru",
   builder: {
      nama: {
         describe: "Nama lengkap",
         demandOption: true,
         type: "string",
      },
      email: {
         describe: "Email",
         demandOption: false,
         type: "string",
      },
      noHP: {
         describe: "Nomor handphone",
         demandOption: true,
         type: "string",
      },
   },
   handler(argv) {
      simpanPertanyaan(argv.nama, argv.email, argv.noHP);
   },
});

yargs.parse();
