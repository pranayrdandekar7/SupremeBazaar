import User from "../models/User.js"


const postSignup = async  ( req,res)=>{

    const {name,email,password,phone,address} = req.body 

    const user = new User({
        name,
        email,
        password,
        phone,
        address
    })
    if (!name){
        return res.json({
            success:false,
            message :"name is required",

        })
    }
   else if (!email){
        return res.json({
            success:false,
            message :"email is required",
            
        })
    }
    if (!password){
        return res.json({
            success:false,
            message :"password is required",
            
        })
    }
    if (!phone){
        return res.json({
            success:false,
            message :"phone is required",
            
        })
    }
    if (!address){
        return res.json({
            success:false,
            message :"address is required",

        })
    }
  
    const savedUser = await user.save() ;

    res.json({
        success : true ,
        message :"User Sign up successfully" ,
        data : savedUser
    })

}

    export {postSignup} ;