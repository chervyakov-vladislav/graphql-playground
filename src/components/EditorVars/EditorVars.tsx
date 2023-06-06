import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setHeads, setVars } from '@/store/reducers/editorTabs/slice';
import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const EditorVars = () => {
  const { activeTabId, tabs } = useAppSelector((state) => state.editorTab);
  const { t } = useTranslation();
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');

  useEffect(() => {
    const tabInfo = tabs.find((item) => item.id == activeTabId);
    if (tabInfo) {
      setVariables(tabInfo.variablesCode);
      setHeaders(tabInfo.headersCode);
    }
  }, [activeTabId]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setVars(variables));
  }, [variables]);
  useEffect(() => {
    dispatch(setHeads(headers));
  }, [headers]);

  const handleVariables = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariables(e.target.value);
  };
  const handleHeaders = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaders(e.target.value);
  };
  return (
    <div>
      <Accordion>
        <AccordionSummary>{t('graphql_page.variables')}</AccordionSummary>
        <AccordionDetails>
          <TextField onChange={handleVariables} fullWidth multiline rows={4} value={variables} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>{t('graphql_page.headers')}</AccordionSummary>
        <AccordionDetails>
          <TextField onChange={handleHeaders} fullWidth multiline rows={4} value={headers} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default EditorVars;
