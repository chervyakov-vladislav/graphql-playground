import React from 'react';

import { Typography, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useGetDataMutation } from '@/store/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectDocument, setCurrentType, setRoot } from '@/store/reducers/document/slice';

const Root = () => {
  const [getData, { data }] = useGetDataMutation({
    fixedCacheKey: 'Introspection',
  });
  const { isRoot } = useAppSelector(selectDocument);
  const dispatch = useAppDispatch();

  const handleClick = (value: string) => {
    dispatch(setCurrentType(value));
    dispatch(setRoot(false));
  };

  return isRoot ? (
    <>
      <Stack direction="row" className="mb-2">
        <Typography
          fontFamily={'Source Sans Pro'}
          component="h4"
          className="flex text-color-documentation-primary items-center text-base font-semibold"
        >
          Root
        </Typography>
      </Stack>

      {data.data.__schema.queryType ? (
        <Stack direction="row" alignItems="center">
          <button
            onClick={() => handleClick(data.data.__schema.queryType.name)}
            className="flex items-center hover:bg-white rounded group px-3 w-full bg-transparent border-0"
          >
            <Typography fontFamily={'Source Code Pro'} className="text-[14px]">
              query:
            </Typography>
            <Typography
              fontFamily={'Source Code Pro'}
              className="ml-2 text-[14px] text-color-documentation-secondary"
            >
              {data.data.__schema.queryType.name}
            </Typography>
            <ArrowForwardIcon className="w-3 h-3 ml-auto fill-none group-hover:fill-color-documentation-primary" />
          </button>
        </Stack>
      ) : null}

      {data.data.__schema.mutationType ? (
        <Stack direction="row" alignItems="center">
          <button
            onClick={() => handleClick(data.data.__schema.mutationType.name)}
            className="flex items-center hover:bg-white rounded group px-3 w-full bg-transparent border-0"
          >
            <Typography fontFamily={'Source Code Pro'} className="text-[14px]">
              mutation:
            </Typography>
            <Typography
              fontFamily={'Source Code Pro'}
              className="ml-2 text-[14px] text-color-documentation-secondary"
            >
              {data.data.__schema.mutationType.name}
            </Typography>
            <ArrowForwardIcon className="w-3 h-3 ml-auto fill-none group-hover:fill-color-documentation-primary" />
          </button>
        </Stack>
      ) : null}

      {data.data.__schema.subscriptionType ? (
        <Stack direction="row" alignItems="center">
          <button
            onClick={() => handleClick(data.data.__schema.subscriptionType.name)}
            className="flex items-center hover:bg-white rounded group px-3 w-full bg-transparent border-0"
          >
            <Typography fontFamily={'Source Code Pro'} className="text-[14px]">
              subscription:
            </Typography>
            <Typography
              fontFamily={'Source Code Pro'}
              className="ml-2 text-[14px] text-color-documentation-secondary"
            >
              {data.data.__schema.subscriptionType.name}
            </Typography>
            <ArrowForwardIcon className="w-3 h-3 ml-auto fill-none group-hover:fill-color-documentation-primary" />
          </button>
        </Stack>
      ) : null}
    </>
  ) : null;
};

export default Root;
