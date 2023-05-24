import React, { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import {
  selectDocument,
  deleteNavItem,
  setArgs,
  setFields,
  setRoot,
  addSchema,
  resetRoot,
} from '@/store/reducers/document/slice';
import { capitalize } from '@/utils/textFotmatter';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetDataMutation } from '@/store/api';
import { ROOT_QUERY } from '@/queries/introspectionQuery';

const BackButton = () => {
  const { nav } = useAppSelector(selectDocument);
  const dispatch = useAppDispatch();
  const [getData, { data, isSuccess }] = useGetDataMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(addSchema(data));
      dispatch(resetRoot());
      dispatch(setRoot(true));
    }
  }, [data]);

  if (nav.length === 1) return null;

  const handleBack = () => {
    dispatch(deleteNavItem());
    const newData = nav[nav.length - 1];
    dispatch(setArgs(newData.prevArgs));
    dispatch(setFields(newData.prevFields));
    if (nav[nav.length - 2].name === 'root') {
      getData({
        body: {
          query: ROOT_QUERY,
        },
      });
    }
  };

  return (
    <Stack direction="row" className="flex items-center text-base font-semibold">
      <button
        onClick={handleBack}
        className="w-6 h-6 flex items-center justify-center mr-3 hover:bg-white duration-300 rounded group bg-transparent border-0"
      >
        <ArrowBackIcon className="w-5 h-5 fill-color-documentation-secondary group-hover:fill-color-documentation-primary" />
      </button>
      <Stack direction="row" className="flex">
        <Typography className="text-color-documentation-primary font-semibold">
          {nav[nav.length - 1].name === 'root'
            ? capitalize(nav[nav.length - 1].name)
            : nav[nav.length - 1].name}
        </Typography>
        {/* если это query mutation subscr - то не выводим тип */}
        {/* <Typography className="text-color-documentation-secondary  font-semibold ml-1">
          [{capitalize(nav[nav.length - 1])}]
        </Typography> */}
      </Stack>
      {/* смотреть в стейте отмечено или нет и подставлять нужную иконку */}
      {/* <button className="w-6 h-6 ml-3 flex items-center justify-center mr-2 hover:bg-white duration-300 rounded group bg-transparent border-0">
        <AddCircleOutlineIcon className="w-5 h-5 stroke-1 fill-color-documentation-secondary group-hover:fill-color-documentation-primary" />
      </button> */}
    </Stack>
  );
};

export default BackButton;
