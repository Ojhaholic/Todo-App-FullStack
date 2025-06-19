import jwt from "jsonwebtoken";
import usermodel from "../models/user.model.js";

export const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWTsecretKey, {
    expiresIn: "2d"
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,          
    sameSite: "None",    
    path: "/",
    maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
  });

  await usermodel.findByIdAndUpdate(userId, { token });
  return token;
};
