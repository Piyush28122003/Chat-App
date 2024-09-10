import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';
import { BiLeftArrow } from 'react-icons/bi';
import GroupChats from './GroupChats';
import useConversation from '../../Zustand/useConversation';
import useGroup from '../../Zustand/useGroup';

const Sidebar = ({show, closeSidebar }) => {
  const [chat,setChat] = useState(true);
  const [group,setGroup] = useState(false);
  const {setSelectedConversation,setMessages} = useConversation();
  const {setSelectedGroup,setGroupMessages} = useGroup();

  const handleChatClick = () => {
    setChat(true);
    setGroup(false);
    setSelectedGroup(null);
    setGroupMessages([]);
  }

  const handleGroupClick = () => {
    setGroup(true);
    setChat(false);
    setSelectedConversation(null);
    setMessages([]);
  }

  return (
    <div className='w-1/3 border-r border-slate-300 p-3 pb-0 flex flex-col min-w-fit'>
    {show && (
      <button
        className='md:hidde ml-auto mb-1 text-gray-500 hover:text-gray-700 transition duration-300'
        onClick={closeSidebar}
      >
        <BiLeftArrow className='h-6 w-6' />
      </button>
    )}
      <SearchInput />
      <div className='h-16 flex items-end justify-between'>
      <span onClick={handleChatClick} className={`text-xl text-center w-1/2 font-bold cursor-pointer ${chat && ' bg-black text-white'} rounded`}>Chats</span>
      <sapn onClick={handleGroupClick} className={`text-xl text-center w-1/2 font-bold cursor-pointer ${group && ' bg-black text-white'} rounded `}>Groups</sapn>
      </div>
      <div className='divider px-3 mt-0 h-2'></div>
      {chat && <Conversations />}
      {group && <GroupChats />}
      <LogoutButton />
    </div>
  );
}

export default Sidebar;
