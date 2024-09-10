import {User} from "../models/userModel.js";

export const getUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const users = await User.find({_id:{$ne:userId}}).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
};