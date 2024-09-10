import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import MessageContainer from '../../components/MessageContainer/MessageContainer';
import { FiMenu, FiX } from 'react-icons/fi';


const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 760);
      setShow(window.innerWidth <= 760);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className='flex w-full h-full pt-0 p-4 rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      {!showSidebar && (
        <div className='lg:hidden fixed top-2 left-4'>
          <button
            onClick={toggleSidebar}
            className='bg-gray-200 p-2 rounded-full shadow-lg '
          >
            <FiMenu className='h-6 w-6' />
          </button>
        </div>
      )}
      {showSidebar && <Sidebar show={show} closeSidebar={closeSidebar} />}
      <MessageContainer />
    </div>
  );
}

export default Home;
