const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:2717/wpu", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
});

// contact1.save().then((contact) => console.log(contact));
