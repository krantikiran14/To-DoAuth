import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const connectionDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.error(error.message));
};
export default connectionDB;

