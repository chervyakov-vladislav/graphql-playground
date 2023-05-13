import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectDocument,
  setRoot,
  addSchema,
  resetRoot,
  sliceNavItems,
  setArgs,
  setFields,
} from '@/store/reducers/document/slice';
import Divider from './Divider';
import { capitalize } from '@/utils/textFotmatter';
import { useGetDataMutation } from '@/store/api';
import { ROOT_QUERY } from '@/queries/introspectionQuery';

const SchemaNaviagation = () => {
  const { nav } = useSelector(selectDocument);
  const dispatch = useDispatch();
  const [getData, { data, isSuccess }] = useGetDataMutation();

  const handleNav = (index: number) => {
    if (!index) {
      getData({
        query: ROOT_QUERY,
      });
    } else {
      dispatch(sliceNavItems(index));
      const newData = nav[index];
      dispatch(setArgs(newData.prevArgs));
      dispatch(setFields(newData.prevFields));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(addSchema(data));
      dispatch(resetRoot());
      dispatch(setRoot(true));
    }
  }, [data]);

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems={'center'}
      className="my-4 text-[14px] text-color-documentation-secondary flex-wrap"
    >
      {nav.map((item, index) => {
        return index ? (
          <React.Fragment key={index}>
            <Divider />
            <button
              onClick={() => handleNav(index)}
              className="hover:underline bg-transparent border-0 font-SourceSansPro"
            >
              {item.name === 'root' ? capitalize(item.name) : item.name}
            </button>
          </React.Fragment>
        ) : (
          <button
            key={index}
            onClick={() => handleNav(index)}
            className="hover:underline bg-transparent border-0 font-SourceSansPro"
          >
            {item.name === 'root' ? capitalize(item.name) : item.name}
          </button>
        );
      })}
    </Stack>
  );
};

export default SchemaNaviagation;
