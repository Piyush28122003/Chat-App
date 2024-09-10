import { useEffect, useState } from "react";
import { useAuthContext } from "../Context/AuthContext";

const useGetGroupChats = () => {
    const [loading, setLoading] = useState(true);
    const [groupChats, setGroupChats] = useState([]);
    const {user} = useAuthContext();

    useEffect(() => {
        const getGroupChats = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/chat/groupChat', {
                    method: "GET",
                    credentials: "include",
                    headers:{
                        jwtToken: `${user?.token}`,
                    }
                });
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setGroupChats(data.data);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        getGroupChats();
    },[]);
    return {loading,groupChats};
};

export default useGetGroupChats;