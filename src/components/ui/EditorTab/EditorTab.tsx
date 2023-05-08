import React, { useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { editorTabSlice } from '@/store/reducers/editorTabs/slice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

interface IProps {
  name: string;
  id: number;
}

const EditorTab = (props: IProps) => {
  const { activeTabId } = useAppSelector((state) => state.editorTab);
  const { setActiveTab } = editorTabSlice.actions;
  const dispatch = useAppDispatch();

  const changeActiveTab = (e: React.MouseEvent) => {
    dispatch(setActiveTab(e.currentTarget.id));
  };

  return (
    <div
      className={`tab py-[6px] pl-[13px] pr-[33px] mr-2 border-[1px] border-solid border-color-heading-border border-b-0 rounded-tl-lg rounded-tr-lg relative ${
        props.id === Number(activeTabId) ? 'bg-transparent' : 'bg-color-inactive-tab'
      }`}
      id={String(props.id)}
      onClick={changeActiveTab}
    >
      <p className={'m-0 p-0 text-color-documentation-primary text-base'}>{props.name}</p>
      <div className="absolute top-0 bottom-0 right-[7px] flex justify-center items-center">
        <button className="flex justify-center items-center w-[20px] h-[20px] bg-transparent border-0 rounded-2 hover:bg-color-heading-border rounded-[4px] cursor-pointer">
          <ClearIcon
            sx={{
              color: '#5A6270',
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default EditorTab;
