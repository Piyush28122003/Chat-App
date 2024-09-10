import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";

export const signup = async (req, res) => {
    const {fullName,username,email,password,confirmPassword,profilePic} = req.body;
    console.log(req.body)
    try {
        if(password !== confirmPassword) return res.status(400).json({error: "Password doesn't match."});
        const user = await User.findOne({username});
        if(user) return res.status(400).json({error: "Username already exists."});
        const salt = await bcrypt.genSalt(10);
        console.log("password:",password,"salt:",salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            username,
            email,
            password:hashedPassword,
            profilePic:profilePic
        });
        if(newUser){
            const token = generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                userName:newUser.username,
                profilePic:newUser.profilePic,
                email:newUser.email,
                token:token
            })
        } else {
            res.status(400).json({error: "Invalid user data."});
        }
    } catch (error) {
        console.log(error);
        if(error.code === 11000) return res.status(400).json({error: "Username or email already exists."});
        res.status(500).json({error: error.message});
        console.log(error);

        
    }
};



export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if(!user || !isPasswordCorrect) return res.status(400).json({error: "Invalid credentials."});
        const token = generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            userName:user.username,
            profilePic:user.profilePic,
            email:user.email,
            token:token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie("jwtToken");
        res.status(200).json({message: "User logged out successfully."});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }   
};