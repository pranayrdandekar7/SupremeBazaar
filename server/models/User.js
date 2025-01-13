import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required:true

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
   timestamps:true
})

const User = model("User", userSchema);

export default User;

