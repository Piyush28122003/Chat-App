import { useState } from "react"
import useConversation from "../Zustand/useConversation";
import toast from "react-hot-toast";
import useGroup from "../Zustand/useGroup";
import { useAuthContext } from "../Context/AuthContext";

const useSendMessage = () => {
    const [loading,setLoading] = useState(false);
    const {user} = useAuthContext();
    let url = "http://localhost:5000/api/messages/";
    const {messages,setMessages,selectedConversation} = useConversation();
    const {selectedGroup,groupMessages,setGroupMessages} = useGroup();
    if(selectedGroup){
        url = url + "sendGroup/" + selectedGroup._id;
    }
    else if(selectedConversation){
        url = url + "send/" + selectedConversation._id;
    }


    const sendMessage = async({message,fileMessage})=>{
        try{
        setLoading(true);
        const res = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                jwtToken: `${user?.token}`,
            },
            credentials:"include",
            body:JSON.stringify({message,file:fileMessage})
        });
        const data = await res.json();
        if(data.error)
        {
            throw new Error(data.error);
        }
        if(selectedGroup){
            setGroupMessages([...groupMessages,data]);
        }
        else if(selectedConversation){
        setMessages([...messages,data]);
        }
    }catch(err){
        toast.error(err.message);
    }
    finally{
        setLoading(false);
    }
}
return {sendMessage,loading};
}

export default useSendMessage;