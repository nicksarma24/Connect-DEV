const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://nikhilspeaks04:z6BeCVYrsz3WgbHN@cluster0.kap2i.mongodb.net/devTinder-database"
)};


module.exports = connectDB;
//everytime you want to connect just mongodb me jaake ip address connect krdo 