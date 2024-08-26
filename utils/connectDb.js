const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected successfully");
  } catch (err) {
    console.log("database connection failed", err);
    process.exit(1); // we want to exit the process incase of any error
  }
};

module.exports = connectDB;
