import { useEffect } from 'react';

export const useEscapeKey = (onClose: () => void) => {
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
};
