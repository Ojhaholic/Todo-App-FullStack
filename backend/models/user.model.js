import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    token: {
        type: String
    }
})

const usermodel = mongoose.model("usermodel", user_schema)

export default usermodel;