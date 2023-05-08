import React from 'react';
import { TabsContainer } from '@/components/Editor/TabsContainer/TabsContainer';
import { Grid } from '@mui/material';

export const EditorContainer = () => {
  return (
    <div className={'pt-12'}>
      <TabsContainer />
      <Grid
        className={'pl-4'}
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item sm={6} xs={12}>
          test
        </Grid>
        <Grid item sm={6} xs={12}>
          test
        </Grid>
      </Grid>
    </div>
  );
};
