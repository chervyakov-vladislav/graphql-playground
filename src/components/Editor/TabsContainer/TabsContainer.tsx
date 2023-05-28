import EditorTab from '@/components/ui/EditorTab/EditorTab';
import { AddTabButton } from '@/components/Editor/AddTabButton/AddTabButton';
import React, { useState } from 'react';
import { ModalWindow } from '@/components/ui/ModalWindow/ModalWindow';
import { CreateTabForm } from '@/components/ui/CreateTabForm/CreateTabForm';
import { useAppSelector } from '@/store/hooks';

export const TabsContainer = () => {
  const { tabs } = useAppSelector((state) => state.editorTab);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={'border-0 border-b-[1px] border-solid border-color-heading-border 2xl:pl-4'}>
      <div className={'flex items-center overflow-x-scroll scrollbar-hide'}>
        {tabs.map((tab, id) => (
          <EditorTab name={tab.name} key={id} id={tab.id} />
        ))}
        <AddTabButton modalOpenFnc={openModal} />
      </div>
      {isModalOpen && (
        <ModalWindow closeModalFnc={closeModal}>
          <CreateTabForm closeModalFnc={closeModal} />
        </ModalWindow>
      )}
    </div>
  );
};
