import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: []
    }],
    isGroupChat: {
        type: Boolean,
        default: false
    },
    groupChatName: {
        type: String,
        default: ''
    },
    profilePic: {
        type: String,
        default: ''
    },
    
}, { timestamps: true });

export const Conversation = mongoose.model('Conversation', conversationSchema);