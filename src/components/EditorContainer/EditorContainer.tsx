import { TabsContainer } from '@/components/Editor/TabsContainer/TabsContainer';
import { Grid } from '@mui/material';
import { EditorHeader } from '@/components/Editor/EditorHeader/EditorHeader';
import { Editor } from '@/components/Editor/Editor/Editor';
import EditorVars from '../EditorVars/EditorVars';
import { ResponseBlock } from '@/components/ResponseBlock/ResponseBlock';

const EditorContainer = () => {
  return (
    <div className="pt-12">
      <TabsContainer />
      <Grid
        className="2xl:pl-4"
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item md={6} xs={12}>
          <div className="flex mt-[10px] md:h-[75vh] grow bg-white  rounded-lg flex-col justify-between relative">
            <div className="p-2 md:p-8 md:pr-0 md:pl-0 border-r-[30px] border-l-[30px] border-solid border-white overflow-auto ">
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
};

export default EditorContainer;
