import React, { useEffect, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../Zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../Context/AuthContext';
import Modal from '../Modal/Modal';
import UserProfile from '../UserProfile/UserProfile';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();
  const { user } = useAuthContext();
  const [showUser, setShowUser] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
  }

  return (
    <div className='flex items-center justify-between'>
        <div className='chat-image avatar cursor-pointer hidden lg:block'>
          <div className='md:w-12 rounded-full'>
            <img src={user.profilePic} alt='user img' onClick={()=>setShowUser(!showUser)}/>
            {showUser && <Modal isOpen={showUser} onClose={()=>setShowUser(false)}>
              <UserProfile user={user} setShowUser={setShowUser} />
      </Modal>}
          </div>
        </div>
      <div>
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
          <input 
            type='text' 
            placeholder='Search' 
            className='w-5/6 input input-bordered rounded-full' 
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
          <button className='btn btn-circle bg-black text-white'>
            <IoSearchSharp className='w-6 h-6 outline-none'/>
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchInput;
