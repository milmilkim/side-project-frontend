import { useModalContext } from '@/contexts/ModalContext';
import { v4 as uuidv4 } from 'uuid';

export const useModal = () => {
  const { modals, setModals } = useModalContext();

  const openModal = (component: React.ReactNode,id?: string) => {
    setModals((prev) => [...prev, { id: id || uuidv4(), isOpen: true, component }]);
  };

  const closeModal = (id?: string) => {
    const modalId = id || modals[modals.length - 1].id;
    setModals((prev) =>
      prev.map((modal) => {
        if (modal.id === modalId) {
          return { ...modal, isOpen: false };
        }
        return modal;
      })
    );

    setTimeout(() => {
      setModals((prev) => prev.filter((modal) => modal.id !== modalId));
    }, 300); 
  };

  const closeAllModals = () => {
    setModals([]);
  };

  return {
    modals,
    openModal,
    closeModal,
    closeAllModals,
  };
};
