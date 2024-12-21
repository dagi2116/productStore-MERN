// src/components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onUpdate, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="dark:bg-[#111] dark:text-white bg-[#eee]  p-6 rounded-lg shadow-lg w-96 relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                    onClick={onClose}>
                    &times;
                </button>

                <div className="mt-2">{children}</div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={onClose}>Cancel</button>

                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={onUpdate}>Update </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
