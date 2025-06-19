//imports
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose, { mongo } from 'mongoose';
import TodoRouter from './routes/todo.route.js';
import userRouter from './routes/user.route.js';
import cors from "cors"
import cookieParser from "cookie-parser";



//consts
const app = express();
const PORT = process.env.PORT;
const MDB_URI = process.env.MONGODB_URI

//middlewares
app.use(cookieParser());
app.use(express.json())
app.use(cors({
  origin: process.env.Frontend_URL,
  credentials:true,
  methods : "GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"]
}))

//Database connection
try {
    await mongoose.connect(MDB_URI)
    console.log("Database connected successfully !")
} catch (error) {
    console.error("Database connection Failed !", error)
}

//creating Server
app.get("/", async(req, res)=>{

    res.send("hello world")
})




//Defining Routes
app.use("/todo", TodoRouter);
app.use("/user", userRouter);

//Starting Server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
});
