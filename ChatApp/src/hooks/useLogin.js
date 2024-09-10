import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

export const useLogin = () => {
    const [loading,setLoading] = useState(false);
    const {setUser} = useAuthContext();
    
    const login = async ({username,password}) => {
        setLoading(true);
        const success = handleInputs({username,password});
        if(!success)
        {
            setLoading(false);
            return;
        }
        try {
            const res = await fetch('http://localhost:5000/api/auth/login',{
                method:"POST",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
            })

            const data = await res.json();
            if(data.error)
            {
                throw new Error(data.error);
                return;
            }
            
            localStorage.setItem("user",JSON.stringify(data));
            setUser(data);
            

        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return {loading,login};
}

const handleInputs = ({username,password}) => {
    if(!username || !password)
    {
        toast.error("Please fill all fields");
        return false;
    }
    return true;
};
export default useLogin;