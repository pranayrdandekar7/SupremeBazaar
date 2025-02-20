import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const postSignup = async (req, res) => {

    const { name, email, password, phone, address, rePassword } = req.body

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "name is required",

        })
    }
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "email is required",

        })
    }
    if (!password) {
        return res.status(400).json({
            success: false,
            message: "password is required",

        })
    }

    if (password !== rePassword) {
        return res.status(400).json({
            success: false,
            message: "password does not match",

        })
    }
    if (!phone) {
        return res.status(400).json({
            success: false,
            message: "phone is required",

        })
    }
    if (!address) {
        return res.status(400).json({
            success: false,
            message: "address is required",
        })
    }
    const saltValue = parseInt(process.env.SALT)
    const salt = bcrypt.genSaltSync(saltValue)

    try {
        const newUser = new User({
            name,
            email,
            phone,
            address,
            password: bcrypt.hashSync(password, salt),
        })

        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: "User Sign up successfully",
            data: {
                name: savedUser.name,
                email: savedUser.email,
                phone: savedUser.phone,
                address: savedUser.address
            }
        })
    }
    catch (err) {
        console.log(err)
        if(err.message.includes("duplicate key error")){
            return res.status(409).json({
                success: false,
                message: `${Object.keys(err.keyValue)} '${Object.values(err.keyValue)}' already exists`,

            })
        }
        
        res.status(400).json({
            success: false,
            message: err.message
        })
    }

}

const postLogin = async (req, res) => {

    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "email is required"
        })
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            message: "password is required"
        })
    }

    const user = await User.findOne({
        email: email
    })

    if (!user) {
        return res.status(403).json({
            success: false,
            message: "please sign up before logging in "
        })
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    
  const userDetails = {
    email: user.email,
    role: user.role,
    _id: user._id,
    name: user.name,
  }

    if (isPasswordMatch) {
        //jwt token

        const jwtToken = jwt.sign(userDetails, process.env.JWT_SECRET);
        res.setHeader("Authorization", `Bearer ${jwtToken}`)

        res.status(200).json({
            success: true,
          
            token: jwtToken,
            data:userDetails ,
            message: 'Login successfull',
        })
    }
    else {
        res.status(401).json({
            success: false,
            message: "Invalid Credentials"
        })
    }

}

//api for verify jwt token
const getToken = async (req, res) => {
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
}

export { postSignup, postLogin, getToken };