import usermodel from "../models/user.model.js"

//validation using Zod
import { z } from "zod"

//password hashing using bcrypt
import bcrypt from "bcryptjs"

//token generation
import { generateTokenAndSaveInCookies } from "../jwt/token.js"


//validation rules
const userValidation = z.object({
    email: z.string().email({ message: "Invalid email" }),
    username: z.string().min(3, { message: "username should have more than 2 characters" }).max(21, { message: "username should have less than 20 characters" }),
    password: z.string().min(6, { message: "password should be of 6 characters or longer" }).max(21, { message: "passwprd should have less than 20 characters" })
})




export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Request Body:", req.body);

    // check if fields are missing
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // run validation
    const validation = userValidation.safeParse({ username, email, password });
    if (!validation.success) {
      return res.status(400).json({
        message: validation.error.errors[0].message // send just one message for alert
      });
    }

    // check if user already exists
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password and save new user
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new usermodel({ username, email, password: hashedPwd });
    await newUser.save();

    // generate token
    const token = await generateTokenAndSaveInCookies(newUser._id, res);

    console.log("User registered successfully");
    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.log("Signup error:", error);
    return res.status(500).json({ message: "Signup error" });
  }
};


export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await usermodel.findOne({ username }).select("+password");

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = await generateTokenAndSaveInCookies(user._id, res);
        console.log("User login successfully");
        res.status(200).json({ message: "User login successfully" });

    } catch (error) {
        console.log("login error", error);
        res.status(400).json({ message: "login error" });
    }
};




export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            path: "/"
        });
        console.log("logout success");
        res.status(200).json({ message: "logout success" });
    } catch (error) {
        console.log("logout error", error);
        res.status(400).json({ message: "logout error" });
    }
};
