import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
    });

    const users = {};

    export const getRecieverSocketId = (recieverId) => {
        return users[recieverId];
    };

    io.on("connection", (socket) => {
        console.log("a user connected",socket.id);
        const userId = socket.handshake.query.userId;
        if (userId) {
            users[userId] = socket.id;
        }
        io.emit("getOnlineUsers", Object.keys(users));
        socket.on("disconnect", () => {
            console.log("user disconnected");
            delete users[userId];
            io.emit("getOnlineUsers", Object.keys(users));
        });
        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
        });
        socket.on("newGroupMessage",(message,room)=>{
            io.to(room).emit("recieveMessage",message);
        })
    });

    export {app, server, io};