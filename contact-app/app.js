// mengambil argument dari command line
const yargs = require("yargs");
const {
   simpanPertanyaan,
   listContact,
   detailContact,
   deleteContact,
} = require("./contacts");

yargs
   .command({
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
   })
   .demandCommand();

// menampilkan daftar semua nama & no hp contact
yargs.command({
   command: "list",
   describe: "Menampilkan semua nama",
   handler() {
      listContact();
   },
});

// menampilkan detail kontak
yargs.command({
   command: "detail",
   describe: "Menampilkan detail sebuah kontak",
   builder: {
      nama: {
         describe: "Nama lengkap",
         demandOption: true,
         type: "string",
      },
   },
   handler(argv) {
      detailContact(argv.nama);
   },
});

// menghapus kontak berdasarkan nama
yargs.command({
   command: "delete",
   describe: "Menghapus kontak",
   builder: {
      nama: {
         describe: "Nama lengkap",
         demandOption: true,
         type: "string",
      },
   },
   handler(argv) {
      deleteContact(argv.nama);
   },
});
yargs.parse();
