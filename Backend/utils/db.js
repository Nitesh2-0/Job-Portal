import mongoose from "mongoose";

const connectDB = async ()=> {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected successfully!🎉🎉🎉');
  } catch (error) {
    console.log("DB connection Error 👿👿 : " + error);
  }
}

export default connectDB