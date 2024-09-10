import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';
import useConversation from '../../Zustand/useConversation';
import useGroup from '../../Zustand/useGroup';

const Messages = () => {
  const {loading,messages,groupMessages} = useGetMessages();
  const {selectedConversation} = useConversation();
  const {selectedGroup} = useGroup();
  const [messagesToDisplay,setMessagesToDisplay] = useState([]); 


  useEffect(()=>{
    if(selectedConversation && messages){
      setMessagesToDisplay(messages);
    }
    return () => {
      setMessagesToDisplay([]);
    }
  }
  ,[messages,selectedConversation]);

  useEffect(()=>{
    if(selectedGroup && groupMessages){
      setMessagesToDisplay(groupMessages);
    }
    return () => {
      setMessagesToDisplay([]);
    }
  }
  ,[groupMessages,selectedGroup]);


  const lastMessageRef = useRef();
  useListenMessages();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView();
		}, 100);
	}, [messagesToDisplay]);
  return (
    <div className='px-4 flex-1 overflow-auto'>
        {!loading && messagesToDisplay?.length > 0 && messagesToDisplay.map((message)=>(
          <div key={message._id} ref={lastMessageRef}>
            <Message message = {message}/>
          </div>
        ))}
        {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
        {!loading && messagesToDisplay.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
    </div>
  )
}

export default Messages