import { TabsContainer } from '@/components/Editor/TabsContainer/TabsContainer';
import { Grid } from '@mui/material';
import { EditorHeader } from '@/components/Editor/EditorHeader/EditorHeader';
import { Editor } from '@/components/Editor/Editor/Editor';
import { Response } from '@/components/Response/Response';
import EditorVars from '../EditorVars/EditorVars';
import { ResponseHeader } from '@/components/ResponseHeader/ResponseHeader';

export function EditorContainer() {
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
        <Grid item md={6} xs={12}>
          <div className="flex mt-[10px] h-[80vh] grow bg-white rounded-lg flex-col justify-between">
            <div className="p-8 ">
              <EditorHeader />
              <Editor />
            </div>
            <EditorVars />
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <div className="flex mt-[8px]">
            <div className="p-8 grow text-black font-SourceSansPro">
              <ResponseHeader />
              <Response />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
