import { useState } from 'react';

import { Modal } from './Modal';
import { REACT_HOOK_FORM, UNCONTROL_FORM } from '../utils/constants';
import { UncontrolledForm } from './forms/UncontrolledForm';
import { ReactHookForm } from './forms/ReactHookForm';

export const Main = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeForm, setActiveForm] = useState<string | undefined>(undefined);

  const handleOpenModal = (title: string): void => {
    setActiveForm(title);
    setIsOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsOpen(false);
  };

  return (
    <div className="flex-grow w-full p-6 bg-gray-100 rounded shadow">
      <div className="flex gap-6 flex-wrap">
        <button
          className="min-w-64 bg-cyan-500 text-white p-2 cursor-pointer hover:bg-cyan-400 focus:outline-2 transition-bg duration-200 linear rounded shadow"
          onClick={() => handleOpenModal('uncontrol')}
        >
          Uncontrolled Form
        </button>
        <button
          className="min-w-64 bg-cyan-500 text-white p-2 cursor-pointer hover:bg-cyan-400 focus:outline-2 transition-bg duration-200 linear rounded shadow"
          onClick={() => handleOpenModal('control')}
        >
          React Hook Form
        </button>
      </div>
      {isOpen && (
        <Modal onClose={handleCloseModal}>
          {activeForm === UNCONTROL_FORM && <UncontrolledForm />}
          {activeForm === REACT_HOOK_FORM && <ReactHookForm />}
        </Modal>
      )}
    </div>
  );
};
