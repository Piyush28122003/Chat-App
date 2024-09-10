import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recieverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' || 'Conversation',
        required: true
    },
    message:{
        type: String
    },
    file:{
        type: String,
        default: ''
    }
},{timestamps: true});

export const Message = mongoose.model("Message", messageSchema);