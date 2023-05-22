import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setVars } from '@/store/reducers/editorTabs/slice';
import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const EditorVars = () => {
  const { activeTabId, tabs } = useAppSelector((state) => state.editorTab);
  const [variables, setVariables] = useState('');

  useEffect(() => {
    const tabInfo = tabs.find((item) => item.id == activeTabId);
    if (tabInfo) setVariables(tabInfo.variablesCode);
  }, [activeTabId]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setVars(variables));
  }, [variables]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariables(e.target.value);
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
