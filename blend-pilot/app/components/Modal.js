"use client";
import { useEffect, useRef } from 'react';

const Modal = ({ children, onClose }) => {
      const modalRef = useRef(null);

      useEffect(() => {
            const handleOutsideClick = (event) => {
                  if (modalRef.current && !modalRef.current.contains(event.target)) {
                        onClose();
                  }
            };
            document.addEventListener('mousedown', handleOutsideClick);
            return () => {
                  document.removeEventListener('mousedown', handleOutsideClick);
            };
      }, [onClose]);

      return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                  <div
                        ref={modalRef}
                        className="glass-card w-full max-w-md p-8 rounded-lg text-center"
                  >
                        {children}
                  </div>
            </div>
      );
};

export default Modal;
