import { MouseEvent, useEffect } from 'react';
import { Typography, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectDocument,
  setArgs,
  setFields,
  addSchema,
  addNavItem,
} from '@/store/reducers/document/slice';
import { useGetDataMutation } from '@/store/api';
import { getTypeFields } from '@/queries/getTypeFields';
import { OfType, NavObj } from '@/types/schema-types';
import { DocumentSkeleton } from '../Skeleton/Skeleton';

function getType(node: OfType): string {
  return node.name ? node.name : getType(node.ofType);
}

const Fields = () => {
  const { fields, args, schema } = useAppSelector(selectDocument);
  const dispatch = useAppDispatch();
  const [getData, { data, isSuccess, isLoading }] = useGetDataMutation();

  const handleField = (index: number) => {
    const navObj: NavObj = {
      name: fields[index].name,
      prevSchema: schema,
      prevFields: fields,
      prevArgs: args,
    };
    dispatch(addNavItem(navObj));
    dispatch(setArgs(fields[index].args));
    dispatch(setFields([]));
  };

  const handleType = (index: number) => {
    const currentType: string = getType(fields[index].type);

    if (
      currentType === 'Int' ||
      currentType === 'String' ||
      currentType === 'Float' ||
      currentType === 'Boolean' ||
      currentType === 'ID' ||
      currentType === 'DateTime' ||
      currentType === 'Role'
    ) {
      return;
    } else {
      const navObj: NavObj = {
        name: currentType,
        prevSchema: schema,
        prevFields: fields,
        prevArgs: args,
      };
      getData({
        body: {
          query: getTypeFields(currentType),
        },
      });
      dispatch(addNavItem(navObj));
    }
  };

  useEffect(() => {
    if (isSuccess && data.data.__type.fields !== null) {
      dispatch(addSchema(data));
      dispatch(setFields(data.data.__type.fields));
      dispatch(setArgs([]));
    }
  }, [data]);

  return !fields ? null : (
    <>
      {isLoading ? (
        <DocumentSkeleton />
      ) : (
        <>
          {fields.length ? (
            <>
              <Stack direction="row" className="mb-2 mt-4">
                <Typography
                  fontFamily={'Source Sans Pro'}
                  component="h4"
                  className="flex items-center text-base font-semibold"
                >
                  Fields
                </Typography>
                {/* <button className="w-6 h-6 ml-5 flex items-center justify-center hover:bg-white duration-300 rounded group bg-transparent border-0">
              <AddCircleOutlineIcon className="w-5 h-5 stroke-1 fill-color-documentation-secondary group-hover:fill-color-documentation-primary" />
            </button> */}
              </Stack>

              <Stack>
                {fields.length &&
                  fields.map((item, index) => {
                    return (
                      <Stack key={item.name} direction="row" alignItems="center">
                        <button className="w-6 h-6 mr-2 my-1 flex items-center justify-center hover:bg-white duration-300 rounded group bg-transparent border-0">
                          <AddCircleOutlineIcon className="w-5 h-5 stroke-1 fill-color-documentation-secondary group-hover:fill-color-documentation-primary" />
                        </button>
                        <button
                          onClick={() => handleField(index)}
                          className="flex items-center hover:bg-white rounded group px-3 w-full bg-transparent border-0"
                        >
                          <Typography fontFamily={'Source Code Pro'} className="text-[14px]">
                            {`${item.name}:`}
                          </Typography>
                          <Typography
                            onClick={(e: MouseEvent) => {
                              e.stopPropagation();
                              handleType(index);
                            }}
                            fontFamily={'Source Code Pro'}
                            className="ml-2 text-[14px] text-color-documentation-secondary hover:underline"
                          >
                            [{getType(item.type)}]
                          </Typography>
                          <ArrowForwardIcon className="w-3 h-3 ml-auto fill-none group-hover:fill-color-documentation-primary" />
                        </button>
                      </Stack>
                    );
                  })}
              </Stack>
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default Fields;
