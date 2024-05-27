const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose.connect("your-mongo-uri", { useNewUrlParser: true });

  console.log("MongoDB Connection Successfully");
};

module.exports = connectDatabase;
