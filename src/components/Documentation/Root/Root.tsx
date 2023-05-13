import { MouseEvent, useEffect, useState } from 'react';
import { Typography, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectDocument,
  addNavItem,
  setRoot,
  setFields,
  setArgs,
  addSchema,
} from '@/store/reducers/document/slice';

import { useGetDataMutation } from '@/store/api';
import { getRootListQuery } from '@/queries/getRootQuery';
import { DocumentSkeleton } from '@/components/Documentation/Skeleton/Skeleton';
import { NavObj } from '@/types/schema-types';

const Root = () => {
  const { schema, args } = useAppSelector(selectDocument);
  const dispatch = useAppDispatch();
  const [elemText, setElemText] = useState('');

  const [getData, { data, isLoading, isSuccess }] = useGetDataMutation();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;

    const newValue = (e.target.closest('button') as HTMLButtonElement).innerText.split(':')[0];
    setElemText(() => newValue);

    getData({
      query: getRootListQuery(newValue),
    }).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      if (elemText === 'query') {
        dispatch(addSchema(data));
        dispatch(setFields(data.data.__schema.queryType.fields));
        dispatch(setArgs([]));
        const navObj: NavObj = {
          name: elemText,
          prevSchema: data,
          prevFields: data.data.__schema.queryType.fields,
          prevArgs: args,
        };
        dispatch(addNavItem(navObj));
      }
      if (elemText === 'mutation') {
        dispatch(addSchema(data));
        dispatch(setFields(data.data.__schema.mutationType.fields));
        dispatch(setArgs([]));
        const navObj: NavObj = {
          name: elemText,
          prevSchema: data,
          prevFields: data.data.__schema.mutationType.fields,
          prevArgs: args,
        };
        dispatch(addNavItem(navObj));
      }
      if (elemText === 'subscription') {
        console.log(data.data.__schema.subscriptionType);
        dispatch(setFields(data.data.__schema.subscriptionType.fields));
        dispatch(setArgs([]));
        const navObj: NavObj = {
          name: elemText,
          prevSchema: data,
          prevFields: data.data.__schema.subscriptionType.fields,
          prevArgs: args,
        };
        dispatch(addNavItem(navObj));
      }
      dispatch(setRoot(false));
    }
  }, [data]);

  return isLoading ? (
    <DocumentSkeleton />
  ) : (
    <>
      <Stack direction="row" className="mb-2 mt-4">
        <Typography
          fontFamily={'Source Sans Pro'}
          component="h4"
          className="flex items-center text-base font-semibold"
        >
          Root
        </Typography>
      </Stack>

      {schema?.data.__schema.queryType ? (
        <Stack direction="row" alignItems="center">
          <button className="w-6 h-6 mr-2 my-1 flex items-center justify-center hover:bg-white duration-300 rounded group bg-transparent border-0">
            <AddCircleOutlineIcon className="w-5 h-5 stroke-1 fill-color-documentation-secondary group-hover:fill-color-documentation-primary" />
          </button>
          <button
            onClick={handleClick}
            className="flex items-center hover:bg-white rounded group px-3 w-full bg-transparent border-0"
          >
            <Typography fontFamily={'Source Code Pro'} className="text-[14px]">
              query:
            </Typography>
            <Typography
              fontFamily={'Source Code Pro'}
              className="ml-2 text-[14px] text-color-documentation-secondary"
            >
              Query
            </Typography>
            <ArrowForwardIcon className="w-3 h-3 ml-auto fill-none group-hover:fill-color-documentation-primary" />
          </button>
        </Stack>
      ) : null}

      {schema?.data.__schema.mutationType ? (
        <Stack direction="row" alignItems="center">
          <button className="w-6 h-6 mr-2 my-1 flex items-center justify-center hover:bg-white duration-300 rounded group bg-transparent border-0">
            <AddCircleOutlineIcon className="w-5 h-5 stroke-1 fill-color-documentation-secondary group-hover:fill-color-documentation-primary" />
          </button>
          <button
            onClick={handleClick}
            className="flex items-center hover:bg-white rounded group px-3 w-full bg-transparent border-0"
          >
            <Typography fontFamily={'Source Code Pro'} className="text-[14px]">
              mutation:
            </Typography>
            <Typography
              fontFamily={'Source Code Pro'}
              className="ml-2 text-[14px] text-color-documentation-secondary"
            >
              Mutation
            </Typography>
            <ArrowForwardIcon className="w-3 h-3 ml-auto fill-none group-hover:fill-color-documentation-primary" />
          </button>
        </Stack>
      ) : null}

      {schema?.data.__schema.subscriptionType ? (
        <Stack direction="row" alignItems="center">
          <button className="w-6 h-6 mr-2 my-1 flex items-center justify-center hover:bg-white duration-300 rounded group bg-transparent border-0">
            <AddCircleOutlineIcon className="w-5 h-5 stroke-1 fill-color-documentation-secondary group-hover:fill-color-documentation-primary" />
          </button>
          <button
            onClick={handleClick}
            className="flex items-center hover:bg-white rounded group px-3 w-full bg-transparent border-0"
          >
            <Typography fontFamily={'Source Code Pro'} className="text-[14px]">
              subscription:
            </Typography>
            <Typography
              fontFamily={'Source Code Pro'}
              className="ml-2 text-[14px] text-color-documentation-secondary"
            >
              Subscription
            </Typography>
            <ArrowForwardIcon className="w-3 h-3 ml-auto fill-none group-hover:fill-color-documentation-primary" />
          </button>
        </Stack>
      ) : null}
    </>
  );
};

export default Root;
