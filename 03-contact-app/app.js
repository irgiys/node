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

// TODO
// menampilkan daftar semua nama & no hp kontak
yargs.command({
   command: "list",
   describe: "Menampilkan semua kontak",
   handler() {
      listContact();
   },
});
// menampilkan detail sebuah kontak
yargs.command({
   command: "detail",
   describe: "Menampilkan detail sebuah kontak berdasarkan nama",
   builder: {
      nama: {
         demandOption: true,
         describe: "nama",
         type: "string",
      },
   },
   handler(argv) {
      detailContact(argv.nama);
   },
});
// menghapus kontak sesuai dengan namanya
yargs.command({
   command: "delete",
   describe: "Menghapus sebuah kontak berdasarkan nama",
   builder: {
      nama: {
         demandOption: true,
         describe: "nama",
         type: "string",
      },
   },
   handler(argv) {
      deleteContact(argv.nama);
   },
});
yargs.parse();
