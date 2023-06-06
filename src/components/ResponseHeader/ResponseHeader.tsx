import React, { useEffect, useState } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useGetDataMutation } from '@/store/api';
import { convertBytes, millisecondsInSec } from '@/utils/helpers';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hooks';

interface IResponseData {
  time: number;
  status: number;
  size: number;
}

export function ResponseHeader() {
  const { activeTabId, tabs } = useAppSelector((state) => state.editorTab);
  const [responseData, setResponseData] = useState<IResponseData | undefined>();
  const { t } = useTranslation();
  const [getResp, { isLoading }] = useGetDataMutation({
    fixedCacheKey: 'LoadData',
  });

  const getData = () => {
    const tabInfo = tabs.filter((item) => item.id == activeTabId);
    if (tabInfo && tabInfo.length && tabInfo[0] && tabInfo[0].responseCode) {
      const responseData = tabInfo[0].responseCode;
      const obj = {
        time: responseData.time,
        size: responseData.size,
        status: responseData.status,
      };
      setResponseData(obj);
    } else {
      setResponseData(undefined);
    }
  };

  useEffect(() => {
    getData();
  }, [tabs]);

  return (
    <div className="flex justify-between">
      <h3 className="m-0 p-0">{t('graphql_page.editor.response')}</h3>
      <div className="flex max-w-[230px] grow justify-between items-center">
        <div className={'min-w-[24px] animate-spin flex justify-center items-center'}>
          {isLoading && <RestartAltIcon fontSize={'small'} />}
        </div>
        {responseData && (
          <div className={'w-full flex justify-between items-center text-xs font-SourceSansPro'}>
            <span>{t('graphql_page.editor.status')}</span>
            <span
              className={`${
                responseData.status / 400 >= 1
                  ? 'text-color-text-bright-red'
                  : 'text-color-text-green'
              }`}
            >
              {responseData.status}
            </span>
            <span>|</span>
            <span>{millisecondsInSec(responseData.time)}</span>
            <span>|</span>
            <span>{convertBytes(responseData.size)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
