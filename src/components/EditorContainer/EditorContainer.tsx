import React, { useEffect, useState } from 'react';
import { TabsContainer } from '@/components/Editor/TabsContainer/TabsContainer';
import { Button, Grid } from '@mui/material';
import { useAppSelector } from '@/hooks/redux';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

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
          <div className={'flex mt-[8px] min-h-[78vh] bg-white rounded-lg'}>
            <div className={'p-8 grow'}>
              <div className="flex font-SourceSansPro justify-between">
                <h3 className="text-black m-0 p-0">Operation</h3>
                <Button
                  sx={{
                    height: '28px',
                    textTransform: 'none',
                  }}
                  variant="contained"
                >
                  <PlayArrowOutlinedIcon />
                  ExampleQuery
                </Button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          {responseCode}
        </Grid>
      </Grid>
    </div>
  );
};
