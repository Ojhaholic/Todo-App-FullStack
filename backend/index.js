//imports
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from 'mongoose';
import TodoRouter from './routes/todo.route.js';
import userRouter from './routes/user.route.js';
import cors from "cors";
import cookieParser from "cookie-parser";

//consts
const app = express();
const PORT = process.env.PORT;
const MDB_URI = process.env.MONGODB_URI;

// Ping endpoint to keep Render backend awake
app.get("/ping", (req, res) => {
  res.send("pong");
});

//middlewares
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: process.env.Frontend_URL,
  credentials: true,
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//Database connection
try {
  await mongoose.connect(MDB_URI);
  console.log("✅ Database connected");
} catch (error) {
  console.error("Database connection failed", error);
}

//Default test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Routers
app.use("/todo", TodoRouter);
app.use("/user", userRouter);

//Server start
app.listen(PORT, () => {
  console.log(` Server running on port: ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
});
