import {Conversation} from "../models/conversationModel.js";
import {Message} from "../models/messageModel.js";
import { getRecieverSocketId, io } from "../socket/socket.js";
import cloudinary from "../utils/cloudinary.js";


export const sendMessage = async (req, res) => {
    try {
        const {message,file} = req.body;
        const {id:recieverId} = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({participants: {$all: [senderId, recieverId]}});
        
        if(!conversation) {
            conversation = await Conversation.create({participants: [senderId, recieverId]});
        }
        

        const newMessage = new Message({
            senderId,
            recieverId,
            message,
            file
        });

        if(newMessage){
            conversation.messages.push(newMessage);
        }
        await Promise.all([conversation.save(),newMessage.save()]);


        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}

export const sendGroupMessage = async (req, res) => {
    try {
        const { id:groupId } = req.params;
        const { message, file } = req.body;
        const senderId = req.user._id;

        // Find the group conversation
        const conversation = await Conversation.findById(groupId);

        if (!conversation) {
            return res.status(404).json({ message: 'Group conversation not found' });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            recieverId:groupId,
            message,
            file
        });

        // Add the message to the group conversation
        if(newMessage){
        conversation.messages.push(newMessage);
        }
        await Promise.all([conversation.save(), newMessage.save()]);

        // Emit the new message to all members of the group
        conversation.participants.forEach(participant => {
            const socketId = getRecieverSocketId(participant);
            io.to(socketId).emit("recieveMessage", newMessage);
        });

        return res.status(201).json(newMessage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}



export const getMessages = async (req, res) => {
    try {
        const {id:recieverId} = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,recieverId]}
        }).populate("messages");
        if(!conversation) {
            res.status(200).json([]);
            return;
        }
        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error"});
    }
}
export const getGroupMessages = async (req, res) => {
    try {
        const {id:groupId} = req.params;
        const group = await Conversation.findById(groupId).populate("messages");
        if(!group) {
            res.status(404).json({error: "Group not found"});
            return;
        }
        res.status(200).json(group.messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Server error"});
    }
}