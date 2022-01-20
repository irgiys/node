const { tulisPertanyaan, simpanPertanyaan } = require("./contacts");
const main = async () => {
   const nama = await tulisPertanyaan("Masukan nama anda : ");
   const email = await tulisPertanyaan("Masukan email anda : ");
   const noHP = await tulisPertanyaan("Masukan nomor HP anda : ");
   simpanPertanyaan(nama, email, noHP);
};

main();
