'use client'

import { Modal } from '@/types/ui';
import { createContext, useState, ReactNode, useContext } from 'react';

interface ModalContext {
  modals: Modal[];
  setModals: React.Dispatch<React.SetStateAction<Modal[]>>;
}

const ModalContext = createContext<ModalContext | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  return (
    <ModalContext.Provider value={{ modals, setModals }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('useModalContext must be used within ModalProvider');
  return context;
};
