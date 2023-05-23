import React from 'react';

interface IProps {
  children: JSX.Element;
  onClickFnc: () => void;
}
export function ResponseButton(props: IProps) {
  return (
    <button
      className="cursor-pointer border-transparent bg-transparent hover:bg-color-heading-border rounded mr-2"
      onClick={props.onClickFnc}
    >
      {props.children}
    </button>
  );
}
