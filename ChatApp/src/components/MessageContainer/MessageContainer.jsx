import React, { useEffect, useState } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import NoChat from './NoChat';
import { useConversation } from '../../Zustand/useConversation';
import UserProfile from '../UserProfile/UserProfile';
import { BsHammer, BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { useAuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';
import useDeleteChat from '../../hooks/useDeleteChat';
import useGroup from '../../Zustand/useGroup';

const MessageContainer = () => {
  const {user} = useAuthContext();
  const { selectedConversation, setSelectedConversation,setMessages} = useConversation();
  const {selectedGroup, setSelectedGroup,groupMessages} = useGroup();
  const [isGroup, setIsGroup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const toggleProfile = () => {
    if (showProfile) {
      setShowProfile(false);
    }
  }
  const {clearChat} = useDeleteChat();

  useEffect(() => {
    if (selectedConversation) {
      setIsGroup(false);
    } else if (selectedGroup) {
      setIsGroup(true);
    }
  }, [selectedConversation, selectedGroup]);

  useEffect(() => {
    return () => {
      setSelectedGroup(null);
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleClearChat = () => {
    clearChat();
  }

  return (
    <div className='bg-slate-50 w-full flex flex-col' onClick={() => toggleProfile()}>
      {!selectedConversation && !selectedGroup ? (
        <NoChat />
      ) : (
        <>
          <div className='bg-white border-slate-300 sm:px-12 md:px-4 py-2 mb-2 border-y flex items-center ju'>
            <div
              className='chat-image avatar cursor-pointer'
              onClick={handleProfileClick}
            >
              <div className='w-8 rounded-full'>
                <img src={!isGroup ? selectedConversation?.profilePic : selectedGroup?.groupChatImage} alt='user img' />
              </div>
            </div>
            <span className='text-black px-2 text-2xl'>
              {!isGroup ? selectedConversation?.fullName : selectedGroup?.groupChatName}
            </span>
            <div className="dropdown dropdown-left fixed right-10">
              <div tabIndex={0} role="button" className="btn"><BsThreeDotsVertical /></div>
              <ul tabIndex={0} className="dropdown-content z-[1] text-red-600 menu p-4 shadow bg-base-100 rounded-box w-52 cursor-pointer">
                <li onClick={handleClearChat}>Clear Chat</li>
              </ul>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
