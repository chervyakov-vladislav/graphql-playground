import { Grid } from '@mui/material';
import React from 'react';
import Documentaion from '@/components/Documentation/Documentaion';
import { EditorContainer } from '@/components/EditorContainer/EditorContainer';

const Columns = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      className="pl-[2%] pt-7"
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
