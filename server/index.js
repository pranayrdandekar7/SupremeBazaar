import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import { getHealth } from "./controllers/health.js";
import { postSignup, postLogin, getToken } from "./controllers/auth.js";
import {postProducts,getProducts} from "./controllers/product.js";
import {postOrders ,putOrders ,getOrderById ,getOrderByUserId} from "./controllers/order.js";
import {postPayments} from "./controllers/payment.js";

import {jwtVerifyMiddleware,checkRoleMiddleware} from "./middlewares/auth.js"

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
//auth
app.post("/signup", postSignup)
app.post("/login", postLogin)
//product
app.post("/products",jwtVerifyMiddleware,checkRoleMiddleware, postProducts)
app.get("/products",getProducts)
//order
app.post("/orders",jwtVerifyMiddleware,postOrders)
app.put("/orders/:id",jwtVerifyMiddleware,putOrders)
app.get("/orders/:id",jwtVerifyMiddleware ,getOrderById)
app.get("/orders/user/:id",jwtVerifyMiddleware , getOrderByUserId)
//payments

app.post ("/payments",postPayments)

app.get("/test", getToken)




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)

    dbconnection();
})
