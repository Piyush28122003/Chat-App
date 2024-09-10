import React, { useState } from 'react';
import { useGroup } from '../../Zustand/useGroup';
import { useSocketContext } from '../../Context/SocketContext';
import UserProfile from '../UserProfile/UserProfile';
import useConversation from '../../Zustand/useConversation';

const Group = ({group, lastIdx, isGroup}) => {
    const {selectedGroup, setSelectedGroup} = useGroup();
    const {setSelectedConversation} = useConversation();
    const isSelected = selectedGroup?._id === group._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(group._id);
    const [showProfile, setShowProfile] = useState(false);
    const handleClick = () => {
        setShowProfile(!showProfile);
    }

    const handleGroupClick = (group) => () => {
        setSelectedGroup(group);
        setSelectedConversation(null);  
    }

    return (
        <>
            <div className=
            {isSelected ? 'flex gap-2 items-center bg-slate-300 rounded p-2 py-1 cursor-pointer' :'flex gap-2 items-center hover:bg-slate-300 rounded p-2 py-1 cursor-pointer'}
            onClick={handleGroupClick(group)}>
            {showProfile && ( <UserProfile profilePic={selectedGroup.groupChatImage} fullName={selectedGroup.groupChatName} /> )}
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div onClick={handleClick} className='w-12 rounded-full'>
                        <img src={group.profilePic || ''} alt='group avatar'/>
                    </div>
                </div>
                <div className='flex flex-col flex-1 text-center'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold '>{group.groupChatName}</p>
                    </div>
                </div>
            </div>
            
            <div className='divider my-0 py-0 custom-divider' />
        </>
    )
}

export default Group;