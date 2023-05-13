import React, { useState } from 'react';
import { TabsContainer } from '@/components/Editor/TabsContainer/TabsContainer';
import { Grid } from '@mui/material';
import { EditorHeader } from '@/components/Editor/EditorHeader/EditorHeader';
import { Editor } from '@/components/Editor/Editor/Editor';

export function EditorContainer() {
  const [responseCode, setResponseCode] = useState('');
  return (
    <div className="pt-12">
      <TabsContainer />
      <Grid
        className="pl-4"
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item sm={6} xs={12}>
          <div className="flex mt-[8px] min-h-[78vh] bg-white rounded-lg">
            <div className="p-8 grow">
              <EditorHeader />
              <Editor />
            </div>
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          {responseCode}
        </Grid>
      </Grid>
    </div>
  );
}
