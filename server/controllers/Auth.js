import User from "../models/User.js"


const postSignup = async (req, res) => {

    const { name, email, password, phone, address ,rePassword } = req.body

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "name is required",

        })
    }
    if (!email) {
        return res .status(400).json({
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

    if (password !== rePassword ) {
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

    try{

    const newUser = new User({
        name,
        email,
        password,
        phone,
        address
    })

    const savedUser = await newUser.save();

    res.status(201).json({
        success: true,
        message: "User Sign up successfully",
        data: savedUser
    })
}
catch(err){
    res.status(400).json({
        success:false,
        message:err.message
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
        email,
        password
    })

    if(!user){
        return res.status(400).json({
             success:false ,
             message: "please sign up before log in "
        })
    }
     
    res.json ({
        success: true,
        message:"Log in successfully"
    })


}

export { postSignup ,postLogin};