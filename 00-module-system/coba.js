function cetakNama(nama) {
   return `Halo saya ${nama}`;
}

const PI = 3.14;
const mahasiswa = {
   nama: "Irgiyansyah",
   umur: "19",
   cetakMhs() {
      return `halo saya ${this.nama}, saya ${this.umur} tahun`;
   },
};

class Mahasiswa {
   constructor() {
      console.log("Halo mahasiswa");
   }
}

// module.exports.PI = PI;
// module.exports.cetakNama = cetakNama;
module.exports = {
   cetakNama,
   PI,
   mahasiswa,
   Mahasiswa,
};
