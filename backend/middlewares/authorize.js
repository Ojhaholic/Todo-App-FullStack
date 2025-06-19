import jwt from 'jsonwebtoken'
import Usermodel from '../models/user.model.js'

export const authenticate = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized! No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTsecretKey);

        const user = await Usermodel.findById(decoded.userId); // ✅ fix typo: findById not findByID
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user_ = user; // ✅ match the controller usage
        next();
    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({ message: "Unauthorized! Token invalid or expired." });
    }
};
