import React from 'react';

interface IProps {
  children: React.ReactNode;
  closeModalFnc: () => void;
}

export function ModalWindow(props: IProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={
        'fixed top-0 z-20 p-2 left-0 z-10 w-full h-full bg-black bg-opacity-50 flex justify-center items-center cursor-pointer'
      }
      onClick={props.closeModalFnc}
    >
      <div
        className="my-5 mx-auto w-[400px] max-h-[80%] overflow-auto rounded-3xl bg-white p-2.5 cursor-auto"
        onClick={handleClick}
      >
        {props.children}
      </div>
    </div>
  );
}
