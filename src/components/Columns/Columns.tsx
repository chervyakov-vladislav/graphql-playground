import { Grid } from '@mui/material';
import React from 'react';
import Documentaion from '@/components/Documentation/Documentaion';

const Columns = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      className="pl-[2%] pr-[2%]"
    >
      <Grid item sm={4} xs={12} className="flex flex-col pt-12 pr-4">
        <Documentaion />
      </Grid>
      <Grid item sm={4} xs={12}>
        <div>operation</div>
      </Grid>
      <Grid item sm={4} xs={12}>
        <div>response</div>
      </Grid>
    </Grid>
  );
};

export default Columns;
