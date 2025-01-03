import jwt from "jsonwebtoken"

// user authentication
const jwtVerifyMiddleware = async (req, res, next) => {
    const jwtToken = req.headers?.authorization?.split(" ")[1];

    if (!jwtToken) {
        return res.status(401).json({
            success: false,
            message: "jwt token is missing"
        })
    }

    try {
        const decoded = await jwt.verify(jwtToken,process.env.JWT_SECRET)

        // console.log("decoded",decoded)

        req.user = decoded;

        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid jwt token"
        })
    }
}

//user authorization
const checkRoleMiddleware = async (req, res,next) => {
    const userRole = req ?.user?.role ;
    const method = req.method ;
    const path = req.path ;

    console.log(userRole);
    console.log(method);
    console.log(path);

    if(method==="POST" && path==="/products" && userRole!=="admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Only admin can add products"
        })
    }

    next();
   
}


export { jwtVerifyMiddleware ,checkRoleMiddleware }