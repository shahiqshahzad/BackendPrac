import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("connect DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
// MONGO_URL = mongodb+srv://admin:admin@cluster.tqtzrnn.mongodb.net/
