import EditorTab from '@/components/ui/EditorTab/EditorTab';
import { AddTabButton } from '@/components/Editor/AddTabButton/AddTabButton';
import React from 'react';
import { useAppSelector } from '@/hooks/redux';

export const TabsContainer = () => {
  const { tabs } = useAppSelector((state) => state.editorTab);

  return (
    <div className={'border-0 border-b-[1px] border-solid border-color-heading-border pl-4'}>
      <div className={'flex items-center overflow-x-scroll scrollbar-hide'}>
        {tabs.map((tab, id) => (
          <EditorTab name={tab.name} key={id} id={tab.id} />
        ))}
        <AddTabButton />
      </div>
    </div>
  );
};
