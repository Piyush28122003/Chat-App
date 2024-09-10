import { Conversation } from "../models/conversationModel.js";
import { getRecieverSocketId,io } from "../socket/socket.js";
import cloudinary from "../utils/cloudinary.js";

export const clearChat = async (req, res) => {
    const recieverId = req.params.id;
    const senderId = req.user._id;
    try {
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,recieverId]}
        });
        let groupConversation = await Conversation.findById(recieverId);
        if(!conversation && !groupConversation){
            res.status(404).json({error: "Conversation not found"});
            return;
        }
        if(conversation){
            conversation.messages = [];
            await conversation.save();
        }
        if(groupConversation){
            groupConversation.messages = [];
            await groupConversation.save();
        }
        res.status(200).json({data:[],message: "Chat cleared"});
    } catch (error) {
        res.status(500).json({error: "Server error"});
        console.log(error);
    }
}

export const createGroupChat = async (req, res) => {
    const {participants} = req.body;
    participants.push(req.user._id);
    const {groupName,groupImage} = req.body;
    try {
        const conversation = new Conversation({
            groupChatName: groupName,
            participants,
            isGroupChat: true,
            profilePic: groupImage
        });
        await conversation.save();

        participants.forEach(participant => {
            const socketId = getRecieverSocketId(participant);
            io.to(socketId).emit("joinRoom", conversation._id.toString());
        });

        res.status(201).json({data: conversation, message: "Group chat created"});
    } catch (error) {
        res.status(500).json({error: "Server error"});
        console.log(error);
    }
}

export const getAllGroupChats = async (req, res) => {
    const userId = req.user._id;
    try {
        const groupChats = await Conversation.find({
            participants: userId,
            isGroupChat: true
        });
        res.status(200).json({data: groupChats});
    } catch (error) {
        res.status(500).json({error: "Server error"});
        console.log(error);
    }
}