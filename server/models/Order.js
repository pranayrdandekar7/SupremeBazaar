import { model, Schema } from "mongoose"

const orderSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: ture
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "product",
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        price: {
            type: Number,
            required: true
        }
    }
    ],

    totalBill: {
        type: Number,
        required: true

    },

    deliveryAddress: {
        type: String,
        required: ture
    },
    phone: {
        type: String,
        required: true

    },
    paymentMode: {
        type: String,
        reqired: true

    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: "payment",
        required: true
    },
})

const Order = model("Order ", orderSchema);
export default Order;

