import React, { useState } from 'react'
import ChatLogo from '../../components/Logo'
import { Link } from 'react-router-dom'
import useSignUp from '../../hooks/useSignUp'
import toast from 'react-hot-toast'

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: ''
  })
  const {loading,signup} = useSignUp();

  const [profilePic,setProfilePic] = useState("");

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      if(reader.readyState === 2){
        uploadFile(reader.result)
      }
    }
  }
const uploadFile = async (image) => {
    if(!image) return;

     const res = await fetch('https://api.cloudinary.com/v1_1/dkcoebfm0/upload', {
         method: 'POST',
         body: JSON.stringify({file: image,
             upload_preset: 'chat-app',}),
         headers: {
             'Content-Type': 'application/json',
         },
     });

     const data = await res.json();
     setProfilePic(data.secure_url);
 };


 const handleInputErrors = ({fullName,username,email,password,confirmPassword,profilePic}) => {
  if(!fullName || !username || !email || !password || !confirmPassword) {
    toast.error("All fields are required.");
    return false;
  }
  if(password !== confirmPassword) {
    toast.error("Password doesn't match.");
    return false;
  }
  return true;
};


  const handleSubmit = (e) => {
    e.preventDefault();
    const success = handleInputErrors(inputs);
   if(success){
      const userDetails = {...inputs,profilePic};
   
    signup(userDetails);
   }
}

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto rounded-xl bg-white'>
      <div className='p-6 w-full rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <ChatLogo />
        <h1 className='text-3xl font-bold text-center mb-4'>
          Sign Up
        </h1>
        <form encType='multipart/form-data' onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
            <input type="text" className="grow" placeholder="Full name" value={inputs.fullName} onChange={(e)=>setInputs({...inputs,fullName:e.target.value})} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
            <input type="text" className="grow" placeholder="Username"
            value={inputs.username} onChange={(e)=>setInputs({...inputs,username:e.target.value})} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
            <input type="text" className="grow" placeholder="Email" 
            value={inputs.email} onChange={(e)=>setInputs({...inputs,email:e.target.value})}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input placeholder='Password' type="password" className="grow"
            value={inputs.password} onChange={(e)=>setInputs({...inputs,password:e.target.value})}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input placeholder='Confirm Password' type="password" className="grow"
            value={inputs.confirmPassword} onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Profile Picture</span>
            </div>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </label>
          <Link to="/login" className="text-sm text-blue-500 hover:underline">Already have an account?</Link>
          <button type="submit" value="Sign Up" className="btn bg-black text-base text-white hover:bg-gray-700" disabled={loading}>
            {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp