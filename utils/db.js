const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Server Connected to DB Successfully");
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  });
//Connection to db
