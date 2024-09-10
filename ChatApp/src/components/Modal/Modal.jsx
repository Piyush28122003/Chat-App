import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      {modalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleClickOutside}
        >
          <div className="bg-transparent p-4 rounded-lg shadow-lg max-w-full">
            <div className="flex justify-end">
              <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 h-5/6">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
