import { useState,useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

export const useGetConversations = () => {
    const [loading,setLoading] = useState(false);
    const [conversations,setConversations] = useState([]);
    const {user} = useAuthContext();

    useEffect(()=>{
        const getConversations = async () => {
            setLoading(true);   
            try {
                const res = await fetch('http://localhost:5000/api/users',{
                    method:"GET",
                    credentials:"include",
                    headers: {
                        jwtToken:`${user?.token}`,
                    }
                
                })
                const data = await res.json();
                if(data.error)
                {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            }
            finally {
                setLoading(false);
            }
        }
        getConversations();
    },[]);
    return {loading,conversations};
}
export default useGetConversations;