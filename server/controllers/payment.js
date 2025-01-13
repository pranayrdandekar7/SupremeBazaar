import Order from "../models/Order.js";
import Payment from "../models/Payment.js";

const postPayments = async (req, res) => {
    const { orderId, amount, paymentMode, status, transactionId } = req.body;

    if (!orderId || !amount || !paymentMode || !status || !transactionId) {
        return res.status(400).json({
            success: false,
            message: "orderId, amount, paymentMode, status, transactionId are required"
        })
    }
    let order;
    try {
        order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }
    }
    catch (err) {

        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

    if (order.status.toLowerCase() == "canceled" || order.status.toLowerCase() == "deliverd ") {
        return res.status(400).json({
            success: false,
            message: "Order is already canceled or delivered"
        })
    }

    const payment = new Payment ({
        paymentMode,
        amount,
        transactionId,
        status,
    })

    try {
        const savedPayment = await payment.save()

        order.paymentId = savedPayment._id;
        order.paymentMode = paymentMode;

        order.timeline.push({ status: "payment completed", date: Date.now() })
        await order.save();
        return res.status(201).json({
            success: true,
            message: "Payment added successfully",
            data: savedPayment
        })
    }
    catch (err) {
        return res.status(400).json({
            suceess: false,
            message: err.message

        })
    }

}

export { postPayments };