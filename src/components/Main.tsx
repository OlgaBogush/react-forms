import { useState } from 'react';

import { Modal } from './Modal';
import { REACT_HOOK_FORM, UNCONTROL_FORM } from '../utils/constants';
import { UncontrolledForm } from './forms/UncontrolledForm';
import { ReactHookForm } from './forms/ReactHookForm';
import { useAppSelector } from '../store/hooks';
import { selectForms } from '../store/userSlice';
import type { IUserData } from '../types/user';
import { UserCard } from './UserCard';

export const Main = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeForm, setActiveForm] = useState<string | undefined>(undefined);
  const forms: IUserData[] = useAppSelector(selectForms);

  const handleOpenModal = (title: string): void => {
    setActiveForm(title);
    setIsOpen(true);
  };

  const handleCloseModal = (): void => {
    setActiveForm(undefined);
    setIsOpen(false);
  };

  return (
    <div className="flex-grow w-full p-6 bg-gray-100 rounded shadow">
      <div className="flex gap-6 flex-wrap">
        <button
          className="min-w-64 bg-blue-500 text-white p-2 cursor-pointer hover:bg-blue-600 focus:outline-2 transition-bg duration-200 linear rounded shadow"
          onClick={() => handleOpenModal('uncontrol')}
        >
          Uncontrolled Form
        </button>
        <button
          className="min-w-64 bg-blue-500 text-white p-2 cursor-pointer hover:bg-blue-600 focus:outline-2 transition-bg duration-200 linear rounded shadow"
          onClick={() => handleOpenModal('control')}
        >
          React Hook Form
        </button>
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        {forms &&
          forms.map((item, index) => (
            <div
              className={`${forms.length - 1 === index ? ' border border-green-300 rounded shadow-lg shadow-green-300/50' : ''}`}
              key={index}
            >
              <UserCard user={item} />
            </div>
          ))}
      </div>
      {isOpen && (
        <Modal onClose={handleCloseModal}>
          {activeForm === UNCONTROL_FORM && (
            <UncontrolledForm handleCloseModal={handleCloseModal} />
          )}
          {activeForm === REACT_HOOK_FORM && (
            <ReactHookForm handleCloseModal={handleCloseModal} />
          )}
        </Modal>
      )}
    </div>
  );
};
