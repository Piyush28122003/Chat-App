import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const protectRoute = async (req, res, next) => {
    try {
        
        const token = req.headers.jwttoken;
               
        if(!token) {
            res.status(401).json({error: "Not authorized, no token"});
            return;
        }
        const decoded = jwt.verify(token, "secretkey");
        if(!decoded) {
            res.status(401).json({error: "Not authorized, token failed"});
            return;
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            res.status(404).json({error: "User not found"});
            return;
        }
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Not authorized, token failed"});
    }
};

export default protectRoute;