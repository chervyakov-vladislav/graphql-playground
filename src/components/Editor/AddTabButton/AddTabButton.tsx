import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { editorTabSlice } from '@/store/reducers/editorTabs/slice';

export function AddTabButton() {
  const dispatch = useAppDispatch();
  const { addTab } = editorTabSlice.actions;
  const addItem = () => {
    dispatch(addTab());
  };

  return (
    <div
      className={
        'h-full flex items-center cursor-pointer p-1 hover:bg-color-heading-border rounded-[4px] transition ease-out duration-500'
      }
      onClick={addItem}
    >
      <AddCircleOutlineIcon
        sx={{
          color: '#5A6270',
        }}
      />
    </div>
  );
}
