import React from 'react';
import { useSelector } from 'react-redux';
import { Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { selectDocument } from '@/store/reducers/document/slice';

const BackButton = () => {
  const { nav } = useSelector(selectDocument);

  if (nav.length === 1) return null;

  return (
    <Stack direction="row" className="flex items-center text-base font-semibold">
      <button className="w-6 h-6 flex items-center justify-center mr-3 hover:bg-white duration-300 rounded group">
        <ArrowBackIcon className="w-5 h-5 fill-color-documentation-secondary group-hover:fill-color-documentation-primary" />
      </button>
      <Stack direction="row" className="flex">
        <Typography className="text-color-documentation-primary font-semibold">
          {nav[nav.length - 2]}:
        </Typography>
        {/* в оразце, если название поля не совпадает с названием типа то название типа в квадратных скобках*/}
        {/* если это query mutation subscr - то не выводим тип */}
        <Typography className="text-color-documentation-secondary  font-semibold ml-1">
          [{nav[nav.length - 2]}]
        </Typography>
      </Stack>
      {/* смотреть в стейте отмечено или нет и подставлять нужную иконку */}
      <button className="w-6 h-6 ml-3 flex items-center justify-center mr-2 hover:bg-white duration-300 rounded group">
        <AddCircleOutlineIcon className="w-5 h-5 stroke-1 fill-color-documentation-secondary group-hover:fill-color-documentation-primary" />
      </button>
    </Stack>
  );
};

export default BackButton;
