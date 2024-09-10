import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import useGetConversations from '../../hooks/useGetConversations';
import { BsPlus } from 'react-icons/bs';
import toast from 'react-hot-toast';
import useGetGroupChats from '../../hooks/useGetGroupChats';
import { useAuthContext } from '../../Context/AuthContext';

const CreateGroup = ({ setShowCreateGroup }) => {
    const { conversations } = useGetConversations();
    const [participants, setParticipants] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [groupImage, setGroupImage] = useState("");
    const {user} = useAuthContext();

    const handleGroupImage = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            uploadFile(reader.result);
        };
    };
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
         setGroupImage(data.secure_url);
     };
    const handleChange = (id) => {
        if (participants.includes(id)) {
            setParticipants(participants.filter(participant => participant !== id));
        } else {
            setParticipants([...participants, id]);
        }
    };

    const handleSubmit = async(e) => {
        
        try {
            const res = await fetch('http://localhost:5000/api/chat/createGroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    jwtToken: `${user?.token}`,
                },
                credentials: 'include',
                body: JSON.stringify({ groupName,participants,groupImage }),
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success('Group Created');
            
            setShowCreateGroup(false);
        } catch (error) {
            console.log(error);
            toast.error('Failed to create group');
        }
    };

    return (
        <form className='flex flex-col gap-5 p-6 bg-gray-100 rounded-lg' onSubmit={handleSubmit}>
            <h2 className='text-2xl font-bold'>Create Group</h2>
            <input onChange={(e)=>setGroupName(e.target.value)} type='text' placeholder='Group Name' className='input' />

            <div className='flex flex-col gap-3 bg-white p-4 rounded-lg'>
                <h2 className='text-xl font-bold'>Add Participants</h2>
                {conversations?.map((conversation) => (
                    <div key={conversation._id} className='flex gap-3 items-center'>
                        <input
                            type='checkbox'
                            onChange={() => handleChange(conversation._id)}
                            checked={participants.includes(conversation._id)}
                        />
                        <img src={conversation.profilePic} alt='user avatar' className='w-12 rounded-full' />
                        <p>{conversation.fullName}</p>
                    </div>
                ))}
            </div>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-sm">Group Profile Picture</span>
                </div>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={handleGroupImage} />
            </label>
            <div className='flex justify-between gap-4 p-5'>
                <button className=' w-1/2 btn bg-green-600 hover:bg-green-700 text-white'>Create Group</button>
                <button className=' w-1/2 btn bg-red-600 hover:bg-red-700 text-white' onClick={() => setShowCreateGroup(false)}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default CreateGroup;
