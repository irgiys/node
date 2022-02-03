const mongoose = require("mongoose");
mongoose.connect("mongodb:mongodb://127.0.0.1:2717/wpu", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
});

// const contact1 = new Contact({
//    nama: "Violet",
//    nohp: "083434343334",
//    email: "violet@yahoo.com",
// });
// contact1.save().then((contact) => console.log(contact));
