import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import useConversation from '../../Zustand/useConversation';
import formatTime from '../../utils/formatTime';
import Modal from '../Modal/Modal';
import useGroup from '../../Zustand/useGroup';

const Message = ({ message }) => {
  const { user } = useAuthContext();
const [showModal, setShowModal] = useState(false);
  const { selectedConversation,setSelectedConversation } = useConversation();
  const {selectedGroup,setSelectedGroup} = useGroup();
  const [conversation,setConversation] = useState(selectedConversation);

  useEffect(()=>{
    if(selectedConversation){
      setConversation(selectedConversation);
    }
  },[selectedConversation]) 

  useEffect(()=>{ 
    if(selectedGroup){
      setConversation(selectedGroup);
    }
  },[selectedGroup]);

  const isSender = message.senderId === user._id;
  const chatType = isSender ? 'chat-end' : 'chat-start';
  const profileImage = isSender ? user.profilePic : conversation?.profilePic;
  const chatBubbleType = isSender ? 'bg-black text-white' : 'bg-white text-black';
  const formattedTime = formatTime(message.createdAt);

  const handleClick = () => {
    setShowModal(true);
  }

  return (
    <div className={`chat ${chatType}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={profileImage} alt='user img' />
        </div>
      </div>
      <div className={`chat-bubble ${chatBubbleType} pb-2`}>
        {message.file &&
            <img src={message.file} alt='file' className='w-60 h-100 object-contain' onClick={handleClick} />}
        {message.message}
      </div>
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="p-10">
            <img src={message.file} alt="file" className="max-w-full max-h-screen" />
          </div>
        </Modal>
      )}
      <div className='chat-footer opacity-70 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message;
