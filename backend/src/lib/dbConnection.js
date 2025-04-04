import mongoose from "mongoose";
import env from "dotenv";
env.config();


const dbConnection= async()=>{
    const connectionUrl = process.env.DB_CONNECTION_URL;
   
  
    try {
        await mongoose.connect(connectionUrl);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
    }
}

export default dbConnection;

