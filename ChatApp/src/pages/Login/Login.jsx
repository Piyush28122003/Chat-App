import React, { useEffect, useState } from 'react'
import ChatLogo from '../../components/Logo'
import { Link } from 'react-router-dom'
import  useLogin from '../../hooks/useLogin'

const Login = () => {
  const [inputs,setInputs] = useState({
    username:'',
    password:''
  })

  const {loading,login} = useLogin();

  const handleSubmit = (e) => {
   e.preventDefault();
    login(inputs);
    
  }
 


  return (
    <div className='flex flex-col justify-center items-center min-w-96 mx-auto rounded-xl bg-white'>
      <div className='w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <ChatLogo/>
        <h1 className='text-3xl font-bold text-center mb-4'>
          Login
        </h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
            <input type="text" className="grow" placeholder="Username" 
              value={inputs.username}
              onChange={(e) => setInputs({...inputs,username:e.target.value})}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input placeholder='Password' type="password" className="grow"
              value={inputs.password}
              onChange={(e) => setInputs({...inputs,password:e.target.value})}
             />
          </label>
          <Link to="/signup" className="text-sm text-blue-500 hover:underline">Don't have an account?</Link>
          <button type="submit" value="Login" className="btn bg-black text-base text-white hover:bg-gray-700" disabled={loading}>
            {loading ? <span className='loading loading-spinner'></span> : "Login"}
          </button>
          </form>
      </div>
    </div>
  )
}

export default Login