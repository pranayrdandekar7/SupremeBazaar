import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import { getHealth } from "./controllers/health.js";
import { postSignup, postLogin, getToken } from "./controllers/Auth.js";

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

const jwtVerifyMiddleware = async (req, res, next) => {
    const jwtToken = req.headers.authorization.split(" ")[1] ;

    if (!jwtToken) {
        return res.status(401).json({
            success: false,
            message: "jwt token is missing"
        })
    }
    try {
        const decoded = await jwt.verify(jwtToken, process.env.JWT_SECRET)

        req.user = decoded ;

        next() ;
    }
    catch(err) {
        return res.status(401).json({
            success: false,
            message: "Invalid jwt token"
        })
    }
}

app.post("/order", jwtVerifyMiddleware,(req,res)=>{

    res.json({
        success:true,
        message:"order place successfully"
    })
})

app.get("/health", getHealth)

app.post("/signup", postSignup)
app.post("/login", postLogin)

app.get("/test", getToken)




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)

    dbconnection();
})
