import Button from '@mui/material/Button';
import React from 'react';

export const MainAuthBlock = () => {
  return (
    <div>
      <div className={'px-[3.7%]'}>
        <h2 className={'font-SourceSansPro font-semibold text-4xl text-color-bright-black'}>
          Welcome!
        </h2>
      </div>
      <div className={'mb-14'}>
        <p className={'font-SourceSansPro max-w-[181px] text-sm leading-5 text-black my-0 mx-auto'}>
          To start using the service, please log in with your account
        </p>
      </div>
      <Button
        variant="contained"
        className={
          'bg-color-purple font-semibold normal-case text-[14px] w-full rounded-b h-[42px] border border-color-border-dark-purple mb-[19px] hover:bg-color-hover-button-purple'
        }
      >
        Log in
      </Button>
      <Button
        variant="contained"
        className={
          'bg-transparent text-color-bright-black font-semibold normal-case text-[14px] w-full rounded-b h-[42px] border border-transparent shadow-none hover:border-color-bright-black hover:bg-transparent'
        }
      >
        Sign in
      </Button>
    </div>
  );
};
