import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import { getHealth } from "./controllers/health.js";
import { postSignup, postLogin } from "./controllers/Auth.js";
import jwt from "jsonwebtoken"
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

app.get("/health", getHealth)

app.post("/signup", postSignup)
app.post("/login", postLogin)

//api for verify jwt token
app.get("/test", (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unathorized"
        })
    }
    const tokenValue = token.split(" ")[1];
    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

        if (decoded) {
            return res.json({
                success: true,
                message: "token is valid",
                data: decoded
            })
        }
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: "token is not valid"
        })
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)

    dbconnection();
})
