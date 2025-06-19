import mongoose, { Schema } from "mongoose";

const todo_schema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    completed:{
        type: Boolean,
        required:true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    }
})

const todomodel = mongoose.model("todomodel", todo_schema)

export default todomodel;