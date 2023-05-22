import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setQueryVariables } from '@/store/reducers/editor/slice';
import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@mui/material';

const EditorVars = () => {
  const { variables } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQueryVariables(e.target.value));
  };
  return (
    <Accordion>
      <AccordionSummary>Variables</AccordionSummary>
      <AccordionDetails>
        <TextField onChange={handleChange} fullWidth multiline rows={4} value={variables} />
      </AccordionDetails>
    </Accordion>
  );
};
export default EditorVars;
