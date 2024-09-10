import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const {setUser} = useAuthContext();

  const signup = async ({fullName,username,email,password,confirmPassword,profilePic}) => {
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        body: JSON.stringify({fullName,username,email,password,confirmPassword,profilePic}),
      })

      const data = await res.json();
      if(data.error)
      {
        throw new Error(data.error);
      }

      localStorage.setItem("user",JSON.stringify(data));
      toast.success("Signed up successfully.");
      setUser(data);


    } catch (error) {

      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  }
  return {loading,signup};
}




export default useSignUp;