import { TabsContainer } from '@/components/Editor/TabsContainer/TabsContainer';
import { Grid } from '@mui/material';
import { EditorHeader } from '@/components/Editor/EditorHeader/EditorHeader';
import { Editor } from '@/components/Editor/Editor/Editor';
import EditorVars from '../EditorVars/EditorVars';
import { ResponseBlock } from '@/components/ResponseBlock/ResponseBlock';

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
          <div className="flex mt-[10px] h-[75vh] grow bg-white rounded-lg flex-col justify-between">
            <div className="p-8 ">
              <EditorHeader />
              <Editor />
            </div>
            <EditorVars />
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <ResponseBlock />
        </Grid>
      </Grid>
    </div>
  );
}
