import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(express.json());
app.use(cors());

//DB connection 

const dbconnection = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    if (conn) {
        console.log("mongo DB is connected succesffully")
    }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)

    dbconnection();
})
