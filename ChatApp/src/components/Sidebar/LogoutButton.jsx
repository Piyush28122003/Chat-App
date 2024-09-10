import React from 'react'
import {BiLogOut} from 'react-icons/bi'
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {
  const {loading,logout} = useLogout();
  return (
    <div className='mb-auto fixed bottom-5'>
        {loading ? (<span className='loading loading-spinner'></span>) :
        (<BiLogOut className='h-6 w-6 text-red-500 cursor-pointer' onClick={logout}/>)}
    </div>
  )
}

export default LogoutButton