import React, { useState } from 'react'
import {useConversation} from '../../Zustand/useConversation'
import { useSocketContext } from '../../Context/SocketContext';
import UserProfile from '../UserProfile/UserProfile';
import useGroup from '../../Zustand/useGroup';
import profile from "../../Profile.jpg"


const Conversation = ({conversation,lastIdx,isGroup}) => {
  const {selectedConversation, setSelectedConversation} = useConversation();
  const {setSelectedGroup} = useGroup();
  const isSelected = selectedConversation?._id === conversation._id;
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const handleConversationClick = (conversation) => () => {
    setSelectedConversation(conversation);
    setSelectedGroup(null);
  }

  return (
    <>
      <div className=
      {isSelected ? 'flex gap-2 items-center bg-slate-300 rounded p-2 py-1 cursor-pointer' :'flex gap-2 items-center hover:bg-slate-300 rounded p-2 py-1 cursor-pointer'}
      onClick={handleConversationClick(conversation)}>
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className='w-12 rounded-full'>
            <img src={!isGroup ? conversation.profilePic :''} alt='user avatar'/>
          </div>
        </div>
        <div className='flex flex-col flex-1 text-center'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold '>{conversation.fullName}</p>
          </div>
        </div>
      </div>
      
      
      <div className='divider my-0 py-0 custom-divider' />
    </>
  )
}

export default Conversation