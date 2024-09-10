import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';
import { TiAttachment } from 'react-icons/ti';
import { BsPaperclip } from 'react-icons/bs';

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const [fileMessage, setFileMessage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim() && !fileMessage) return;
        sendMessage({ message, fileMessage });
        setMessage('');
        setFileMessage('');
        setImagePreview('');
    };

    const handleAttachmentClick = (e) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';

        fileInput.addEventListener('change', (event) => {
            const files = event.target.files;
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
                setImagePreview(reader.result);
                uploadFile(reader.result);
            };
        });

        fileInput.click();
    };

    const uploadFile = async (files) => {
       if(!files) return;

        const res = await fetch('https://api.cloudinary.com/v1_1/dkcoebfm0/upload', {
            method: 'POST',
            body: JSON.stringify({file: files,
                upload_preset: 'chat-app',}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        setFileMessage(data.secure_url);
    };

    return (
        <>
        {imagePreview && (
            <div className='bg-transpaent max-w-fit max-h-fit'>
                    <img src={imagePreview} alt='Preview' className='w-50 h-40 rounded-lg mr-3' />
                    </div>)}
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative'>
            
                <button
                    type='button'
                    className='bg-gray-200 text-gray-700 absolute inset-y-0 right-10 flex justify-center items-center px-3'
                    onClick={handleAttachmentClick}
                >
                    <BsPaperclip className='h-5 w-5' />
                </button>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-700 text-black'
                    placeholder='Type a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='bg-black text-white absolute inset-y-0 end-0 flex justify-center items-center ps-3 pe-3'>
                    <BsSend />
                </button>
            </div>
        </form>
        </>
    );
};

export default MessageInput;
