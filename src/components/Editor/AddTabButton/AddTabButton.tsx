import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react';

interface IProps {
  modalOpenFnc: () => void;
}

export function AddTabButton(props: IProps) {
  const addItem = () => {
    props.modalOpenFnc();
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
