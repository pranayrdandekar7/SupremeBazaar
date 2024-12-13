import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String

    },
    roll: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

}, {
    timestamp: true,
})

const User = model("User ", userSchema);

export default User;