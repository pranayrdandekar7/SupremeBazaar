import { model, Schema } from "mongoose "

const paymentSchema = new Schema({

    paymentMode: {
        type: String,
        required: true

    },
    amount: {
        type: Number,
        required: true

    },
    transactionId: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        defualt: "pending"
    },

},
    {
        timestamp: true
    });

const Payment = model("Payment", paymentSchema);

export default Payment;