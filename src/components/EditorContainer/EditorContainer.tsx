import EditorTab from '@/components/ui/EditorTab/EditorTab';
import React from 'react';
import { useAppSelector } from '@/hooks/redux';

export const EditorContainer = () => {
  const { tabs } = useAppSelector((state) => state.editorTab);

  return (
    <div className={'pt-12'}>
      <div className={'border-0 border-b-[1px] border-solid border-color-heading-border'}>
        <div className={'pl-4'}>
          <div className={'flex'}>
            {tabs.map((tab, id) => (
              <EditorTab name={tab.name} key={id} id={tab.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
