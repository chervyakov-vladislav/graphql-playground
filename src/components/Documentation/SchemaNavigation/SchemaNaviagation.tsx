import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectDocument } from '@/store/reducers/document/slice';
import Divider from './Divider';
import React from 'react';

const SchemaNaviagation = () => {
  const { nav } = useSelector(selectDocument);

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems={'center'}
      className="my-4 text-[14px] text-color-documentation-secondary"
    >
      {nav.map((item, index) => {
        return index ? (
          <React.Fragment key={index}>
            <Divider />
            <button className="hover:underline">{item}</button>
          </React.Fragment>
        ) : (
          <button key={index} className="hover:underline">
            {item}
          </button>
        );
      })}
    </Stack>
  );
};

export default SchemaNaviagation;
