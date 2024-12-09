'use client';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/useModal';
import { useCallback } from 'react';
const Page = () => {
  const { openModal } = useModal();

  const handleClickButton = useCallback(async () => {
    const TestModal = (await import('@/components/modals/TestModal')).default;

    openModal(<TestModal message={'hello world'} />, Date.now().toString());
  }, [openModal]);

  return (
    <div>
      <Button onClick={handleClickButton}>Click me</Button>
    </div>
  );
};

export default Page;
