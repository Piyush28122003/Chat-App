import React, { useState } from 'react';
import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';
import useGetGroupChats from '../../hooks/useGetGroupChats';
import Group from './Group';
import { BsPlus } from 'react-icons/bs';
import CreateGroup from './CreateGroup';
import Modal from '../Modal/Modal';

const GroupChats = () => {
 const {loading,groupChats} = useGetGroupChats();
 const [showCreateGroup, setShowCreateGroup] = useState(false);
 const handleClcik = () => {
    setShowCreateGroup(true);
 }

 const handleCloseCreateGroup = () => {
    setShowCreateGroup(false);
  }

  return (
    <>
    {showCreateGroup && <Modal isOpen={showCreateGroup} onClose={handleCloseCreateGroup}>
        <CreateGroup setShowCreateGroup={setShowCreateGroup} />
      </Modal>}
    <div className='py-2 flex flex-col overflow-auto'>
      {groupChats?.map((group, idx) => (
        <Group
          key={group._id}
          group={group}
          lastIdx={idx === groupChats.length - 1}
          isGroup={true}
        />
      ))}
      {loading ? <span className='loading loading-spinner'></span> : null}
      <button onClick={handleClcik}
      className="bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center text-2xl"
    >
      <BsPlus /> 
      Create Group
    </button>
    
    </div>
    </>
  );
}

export default GroupChats;