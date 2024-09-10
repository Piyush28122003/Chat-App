import React from 'react'
import { TiMessages } from 'react-icons/ti'
import Logo from '../Logo'

const NoChat = () => {
  return (
    <div className='flex justify-center items-center w-full h-full'>
        <div className='px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2'>
            <div className='flex items-center justify-center gap-1'><p className='text-3xl'>Welcome to</p>
            <Logo/>
            </div>
            <p className='text-2xl'>Click on a chat to start messaging</p>
            <TiMessages className='text-9xl md:text-12xl text center'/>
        </div>
    </div>
  )
}

export default NoChat