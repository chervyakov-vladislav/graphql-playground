import React, { useEffect, useState } from 'react';
import { TabsContainer } from '@/components/Editor/TabsContainer/TabsContainer';
import { Grid } from '@mui/material';
import { useAppSelector } from '@/hooks/redux';

export const EditorContainer = () => {
  const { tabs, activeTabId } = useAppSelector((state) => state.editorTab);
  const [requestCode, setRequestCode] = useState('');
  const [responseCode, setResponseCode] = useState('');

  useEffect(() => {
    const item = tabs.find((item) => item.id == activeTabId);
    if (item) {
      setRequestCode(item.requestCode);
      setResponseCode(item.responseCode);
    }
  }, [activeTabId]);

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
          {requestCode}
        </Grid>
        <Grid item sm={6} xs={12}>
          {responseCode}
        </Grid>
      </Grid>
    </div>
  );
};
