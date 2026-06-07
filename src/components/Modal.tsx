import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ReactHookForm } from './forms/ReactHookForm';
import { UncontrolledForm } from './forms/UncontrolledForm';
import { REACT_HOOK_FORM, UNCONTROL_FORM } from '../utils/constants';

interface ModalProps {
  onClose: () => void;
  activeForm: string | undefined;
}

export const Modal = ({ onClose, activeForm }: ModalProps) => {
  const portalModalRoot = document.getElementById(
    'portal-modal-root'
  ) as HTMLElement;

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 backdrop-blur-xs flex flex-col justify-center items-center"
      onClick={onClose}
    >
      <div
        className="fixed bg-gray-100 flex flex-col items-center gap-6 p-6 h-[80vh] w-xl rounded shadow-xl overflow-hidden"
        onClick={handleStopPropagation}
      >
        <button
          className="absolute top-2 right-4 text-gray-300 hover:text-gray-500 transition-text duration-200 linear font-bold text-lg cursor-pointer"
          onClick={onClose}
        >
          x
        </button>
        {activeForm === REACT_HOOK_FORM && <ReactHookForm />}
        {activeForm === UNCONTROL_FORM && <UncontrolledForm />}
      </div>
    </div>,
    portalModalRoot
  );
};
