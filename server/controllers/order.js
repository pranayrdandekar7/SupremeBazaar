import Order from "../models/Order.js";

const postOrders = async (req, res) => {

    const { products, deliveryAddress, phone, paymentMode } = req.body

    if (!products || !deliveryAddress || !phone || !paymentMode) {
        return res.status(400).json({
            success: false,
            message: `products , deliveryAddress , phone , paymentMode are required `,
            data: null
        })
    }

    let totalBill = 0;

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

        const savedOrder = await newOrder.save();

        return res.status(201).json({
            success: true,
            message: "orders created successfully",
            data: savedOrder

        })

    }
    catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        })

    }
}


const putOrders = async (req, res) => {
    console.log(req.user)
    let user = req.user
    const { id } = req.params;

    let order;
    try {
        order = await Order.findById(id)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found "
            })
        }


        if (order.userId != user._id) {
            return res.status(401).json({
                success: false,
                message: " You are not athorized to update this order",
                data: null
            })
        }

        if (user.roll === "user") {

            if (order.status === "deliverd") {
                return res.status(400).json({
                    success: false,
                    message: "Order is already delivered",
                    data: null
                })
            }
            if (req.body.status === "cancelled") {
                order.status = "cancelled"
            }
        }

        if (req.body.phone) {
            order.phone = req.body.phone;
        }

        if (req.body.deliveryAddress) {
            order.deliveryAddress = req.body.deliveryAddress;
        }



        if (user.role === "admin") {
            if (req.body.status) order.status = req.body.status;
            if (req.body.timeline) order.timeline = req.body.timeline;
        }

        const savedOrders = await order.save();
        console.log(savedOrders);

        const updatedOrder = await Order.findById(id)

        return res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: updatedOrder
        })
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

}

const getOrderById =async (req, res) => {
    const user = req.user ;
    const { id } = req.params;

    let order;
    try {
        order = await Order.findById(id) 
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found "
            })
        }
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

    if (user.role !== "admin" && order.userId!= user._id) {
        return res.status(401).json({
            success: false,
            message: "You are not athorized to view this order",
            data: null
        })
    }
    return res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: order
    })
 
}


export { postOrders, putOrders ,getOrderById };



