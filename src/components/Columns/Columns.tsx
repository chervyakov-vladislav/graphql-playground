import { Grid, CircularProgress } from '@mui/material';
import React from 'react';
import dynamic from 'next/dynamic';

const Documentaion = dynamic(() => import('@/components/Documentation/Documentaion'), {
  loading: () => <CircularProgress color="inherit" />,
});

const EditorContainer = dynamic(() => import('@/components/EditorContainer/EditorContainer'), {
  loading: () => <CircularProgress color="inherit" />,
});

const Columns = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      className="pl-[2%] pr-[2%] pt-7"
    >
      <Grid item xl={3} xs={12} className="flex flex-col pt-12">
        <Documentaion />
      </Grid>
      <Grid item xl={9} xs={12}>
        <EditorContainer />
      </Grid>
    </Grid>
  );
};

export default Columns;
