import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import connectDB from "./db/db.js";
import { app, server } from "./socket/socket.js";




// const port =  5000;
const port = process.env.PORT || 5000;
dotenv.config();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);



server.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
