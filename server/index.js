import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import { getHealth } from "./controllers/health.js";
import { postSignup, postLogin, getToken } from "./controllers/Auth.js";
import {postProducts,getProducts} from "./controllers/product.js";
import {postOrders} from "./controllers/order.js";

import {jwtVerifyMiddleware,checkRoleMiddleware} from "./middlewares/auth.js"

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



app.post("/order",jwtVerifyMiddleware,(req,res)=>{

    res.json({
        success:true,
        message:"order place successfully"
    })
})

app.get("/health", getHealth)

app.post("/signup", postSignup)
app.post("/login", postLogin)
//product
app.post("/products",jwtVerifyMiddleware,checkRoleMiddleware, postProducts)
app.get("/products",getProducts)
//order
app.post("/orders",jwtVerifyMiddleware,postOrders)

app.get("/test", getToken)




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)

    dbconnection();
})
