import React, { useState } from 'react';

const UserProfile = ({ user,setShowUser }) => {
  return (
    <div className='w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white flex flex-col p-8 rounded-lg max-w-md w-full h-full'>
        <div className='flex items-center justify-center'>
          <img src={user.profilePic} alt='user img' className='w-12 h-12 rounded-full mb-4' />
        </div>
        <h2 className='text-2xl font-semibold text-center mb-4'>{user.userName}</h2>
        <div className='pt-4 pb-12 pr-12'>
        <p className='text-lg font-semibold'>Your name</p>
          <p className='text-lg'>{user.fullName}</p>
          <p className='text-lg font-semibold'>Your email</p>
          <p className='text-lg'>{user.email}</p>
        </div>
      <button className='bg-red-500 text-white rounded-lg p-1' onClick={()=>setShowUser(false)}>Close</button>
      </div>
    </div>
  );
};

export default UserProfile;
