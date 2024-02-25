const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;
// const URI = "mongodb://127.0.0.1:27017/mern_admin";
// mongoose.connect(URI);

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection sucessful");
  } catch (error) {
    console.error("database connection failed");
    process.exit(0);
  }
};

module.exports = connectDB;
