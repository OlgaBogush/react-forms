import React from 'react';
import { createPortal } from 'react-dom';
import { useEscapeKey } from '../utils/useEscapeKey';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ onClose, children }: ModalProps) => {
  const portalModalRoot = document.getElementById(
    'portal-modal-root'
  ) as HTMLElement;

  useEscapeKey(onClose);

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 backdrop-blur-xs flex flex-col justify-center items-center"
      onClick={onClose}
    >
      <div
        className="fixed bg-gray-100 flex flex-col items-center gap-6 p-6 h-[90vh] w-xl rounded shadow-2xl overflow-hidden"
        onClick={handleStopPropagation}
      >
        <button
          className="absolute top-2 right-4 text-gray-300 hover:text-gray-500 transition-text duration-200 linear font-bold text-lg cursor-pointer"
          onClick={onClose}
        >
          x
        </button>
        {children}
      </div>
    </div>,
    portalModalRoot
  );
};
