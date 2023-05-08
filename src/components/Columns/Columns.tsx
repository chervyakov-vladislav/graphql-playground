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
      className="pl-[2%]"
    >
      <Grid item sm={4} xs={12} className="flex flex-col pt-12">
        <Documentaion />
      </Grid>
      <Grid item sm={4} xs={12}>
        <div>
          <EditorContainer />
        </div>
      </Grid>
      <Grid item sm={4} xs={12}>
        <div>response</div>
      </Grid>
    </Grid>
  );
};

export default Columns;
