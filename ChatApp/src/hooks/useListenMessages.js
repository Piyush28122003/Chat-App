import { useEffect, useMemo } from "react";
import { useSocketContext } from "../Context/SocketContext";
import useConversation from "../Zustand/useConversation"
import useGroup from "../Zustand/useGroup";
import { io } from "socket.io-client";

const useListenMessages = () =>{
    const {messages,setMessages} = useConversation();
    const {groupMessages,setGroupMessages} = useGroup();
    const {socket} = useSocketContext();

    useEffect(()=>{
        socket?.on("newMessage", (message) => {
            setMessages([...messages,message]);
        });
        return () => socket?.off("newMessage");
    },[messages,socket, setMessages])

    useEffect(()=>{
        socket?.on("recieveMessage", (message) => {
            setGroupMessages([...groupMessages,message]);
        });
        return () => socket?.off("recieveMessage");
    },[groupMessages,socket, setGroupMessages])
}

export default useListenMessages;