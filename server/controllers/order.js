import Order from "../models/Order.js";

const postOrders =async (req, res) => {

    const {products,deliveryAddress,phone,paymentMode} =req.body

    if(!products || !deliveryAddress || !phone || !paymentMode) {
        return res.status(400).json({
            success: false,
            message: `products , deliveryAddress , phone , paymentMode are required `,
            data:null
        })
    }

    let totalBill = 0 ;

    products.forEach(product => {
      totalBill += product.price * product.quantity
    })

    try {
    const newOrder = new Order({
        userId: req.user._id,
        products,
        deliveryAddress,
        phone,
        paymentMode,
        totalBill
    })

    const savedOrder = await newOrder.save() ;
   
    return res.status(201).json({
    success: true,
    message: "orders created successfully",
    data : savedOrder
 
})

}
catch (err){
   
    return res.status(400).json({
        success: false,
        message:err.message
    })
 
}}

export {postOrders};