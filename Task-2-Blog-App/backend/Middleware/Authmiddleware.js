import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res) => {
    let token;

    if (
        req.header.authorization &&
        req.header.authorization.startWith("Bearer")
    ) {
        try {
            token = req.header.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed"})
        }
    }

    if(!token){
        res.status(401).json({ message: "Not authorized, no token"})
    }
};

export default protect;