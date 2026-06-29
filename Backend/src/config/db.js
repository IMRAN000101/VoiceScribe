const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`[DB] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("[DB] MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
// console.log(process.env.MONGODB_URI);
module.exports = connectDB;
