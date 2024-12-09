'use client';

import {
  Dialog,
  DialogContent,
//   DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';


import { useModal } from '@/hooks/useModal';
const Modal = () => {
  const { modals, closeModal } = useModal();

  const handleChange = (id: string) => {
    closeModal(id);
  };

  return (
    <>
      {modals.map((modal) => (
        <Dialog
          key={modal.id}
          open={modal.isOpen}
          onOpenChange={() => handleChange(modal.id)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{modal.id}</DialogTitle>
                {modal.component}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
};

export default Modal;
