import { Button } from '@mui/material';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setQuery } from '@/store/reducers/editor/slice';
import { joinTextFromArr } from '@/utils/textFotmatter';

export const EditorHeader = () => {
  const { activeTabId, tabs } = useAppSelector((state) => state.editorTab);
  const [editorTabName, setEditorTabName] = useState('ExampleQuery');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tabInfo = tabs.filter((item) => item.id == activeTabId);
    if (tabInfo.length) {
      setEditorTabName(tabInfo[0].name);
    }
  }, [activeTabId]);
  const handleClick = () => {
    const tabInfo = tabs.find((item) => item.id == activeTabId);
    if (tabInfo) {
      const requestCode = joinTextFromArr(tabInfo.requestCode);

      dispatch(setQuery({ query: requestCode, variables: tabInfo.variablesCode }));
    }
  };
  return (
    <div className="flex font-SourceSansPro justify-between select-none">
      <h3 className="text-black m-0 p-0">Operation</h3>
      <Button
        sx={{
          height: '28px',
          textTransform: 'none',
          width: '160px',
        }}
        className={'truncate'}
        variant="contained"
        onClick={handleClick}
      >
        <PlayArrowOutlinedIcon />
        <p className={'truncate w-[100px]'}>{editorTabName}</p>
      </Button>
    </div>
  );
};
