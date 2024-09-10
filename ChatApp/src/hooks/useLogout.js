import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useLogout = () => {
    const [loading,setLoading] = useState(false);
    const {setUser} = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/logout',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
            })

           const data = await res.json();
              if(data.error)
              {
                throw new Error(data.error);
              }
                localStorage.removeItem("user");
                setUser(null);
                
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return {loading,logout};
};

export default useLogout;