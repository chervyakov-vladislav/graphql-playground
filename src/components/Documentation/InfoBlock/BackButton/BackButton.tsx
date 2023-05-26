import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { backNavigation, selectDocument } from '@/store/reducers/document/slice';

const BackButton = () => {
  const { navigationStack } = useAppSelector(selectDocument);
  const dispatch = useAppDispatch();

  const handleBack = () => {
    dispatch(backNavigation());
  };

  return navigationStack.length > 1 ? (
    <button
      onClick={handleBack}
      className="h-6 flex items-center justify-center mr-3 hover:bg-white duration-300 rounded group bg-transparent border-0"
    >
      <ArrowBackIcon className="w-5 h-5 fill-color-documentation-secondary group-hover:fill-color-documentation-primary mr-2" />
      <Typography
        fontFamily={'Source Sans Pro'}
        component="h4"
        className="text-base font-semibold text-[14px]"
      >
        {navigationStack[navigationStack.length - 1]}
      </Typography>
    </button>
  ) : null;
};

export default BackButton;
