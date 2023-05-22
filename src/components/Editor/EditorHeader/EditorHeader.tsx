import { Button } from '@mui/material';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setQuery } from '@/store/reducers/editor/slice';
import { joinTextFromArr } from '@/utils/textFotmatter';
import { useTranslation } from 'react-i18next';

export const EditorHeader = () => {
  const { activeTabId, tabs } = useAppSelector((state) => state.editorTab);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const handleClick = () => {
    const tabInfo = tabs.find((item) => item.id == activeTabId);
    if (tabInfo) {
      const requestCode = joinTextFromArr(tabInfo.requestCode);

      dispatch(setQuery({ query: requestCode, variables: '' }));
    }
  };
  return (
    <div className="flex font-SourceSansPro justify-between select-none">
      <h3 className="text-black m-0 p-0">{t('graphql_page.request')}</h3>
      <Button
        sx={{
          height: '28px',
          textTransform: 'none',
        }}
        variant="contained"
        onClick={handleClick}
      >
        <PlayArrowOutlinedIcon />
        ExampleQuery
      </Button>
    </div>
  );
};
