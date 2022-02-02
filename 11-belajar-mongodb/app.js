const { MongoClient, ObjectID } = require("mongodb");

const uri = "mongodb://127.0.0.1:2717/";
const dbName = "wpu";

const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

client.connect((error, client) => {
   if (error) {
      return console.log("Koneksi gagal " + error);
   }
   // pilih data base
   const db = client.db(dbName);
   // menambahkan satu data ke collection mahasiswa
   // db.collection("mahasiswa").insertOne(
   //    {
   //       nama: "erik",
   //       email: "erik@gmail.com",
   //    },
   //    (error, result) => {
   //       if (error) {
   //          return console.log("gagal menambahkan data");
   //       }
   //       console.log(result);
   //    }
   // );

   // menambahkan lebih dari satu data ke collection mahasiswa
   // db.collection("mahasiswa").insertMany(
   //    [
   //       {
   //          nama: "Vi",
   //          email: "vio@yahoo.com",
   //       },
   //       {
   //          nama: "yansy",
   //          email: "irgiyansy@gmail.com",
   //       },
   //    ],
   //    (error, result) => {
   //       if (error) {
   //          return console.log(error);
   //       }
   //       console.log(result);
   //    }
   // );

   // menampilkan semua data di collection mahasiswa
   // console.log(
   //    db
   //       .collection("mahasiswa")
   //       .find()
   //       .toArray((error, result) => {
   //          console.log(result);
   //       })
   // );

   // menampilkan data berdasarkan kriteria
   // console.log(
   //    db
   //       .collection("mahasiswa")
   //       .find({ _id: ObjectID("61fa9b1174de8a2e7439a6e7") })
   //       .toArray((error, result) => {
   //          console.log(result);
   //       })
   // );

   // mengubah data berdasarkan id
   // const updatePromise = db.collection("mahasiswa").updateOne(
   //    {
   //       _id: ObjectID("61fa9b1174de8a2e7439a6e7"),
   //    },
   //    {
   //       $set: {
   //          email: "Violet@yahoo.com",
   //       },
   //    }
   // );
   // updatePromise
   //    .then((result) => console.log(result))
   //    .catch((error) => console.log(error));

   // mengubah lebih dari satu data
   // db.collection("mahasiswa").updateMany(
   //    {
   //       nama: "erik",
   //    },
   //    {
   //       $set: {
   //          nama: "erik doank",
   //       },
   //    }
   // );

   // menghapus satu data
   db.collection("mahasiswa")
      .deleteOne({
         _id: ObjectID("61fa9b1174de8a2e7439a6e8"),
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));

   // menghapus lebih dari satu data
   // db.collection("mahasiswa")
   //    .deleteMany({
   //       nama: "erik doank",
   //    })
   //    .then((result) => console.log(result))
   //    .catch((error) => console.log(error));
});
