import React, { useEffect, useLayoutEffect, useState } from 'react';
import { selectEditor } from '@/store/reducers/editor/slice';
import { useGetDataMutation } from '@/store/api';
import { IResponse, updateActiveTab } from '@/store/reducers/editorTabs/slice';
import { isFetchBaseQueryError } from '@/utils/helpers';
import { ResponseButtons } from '@/components/Response/ResponseButtons/ResponseButtons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const Response = () => {
  const { activeTabId, tabs } = useAppSelector((state) => state.editorTab);
  const [previousActiveTabId, setPreviousActiveTabId] = useState<number | undefined>(activeTabId);
  const dispatch = useAppDispatch();
  const [requestTimeStart, setRequestTimeStart] = useState(0);
  const {
    body: { query, variables },
    headers,
  } = useAppSelector(selectEditor);
  const [response, setResponse] = useState<string | undefined>();
  const [getResp, { data, isSuccess, isLoading, error }] = useGetDataMutation({
    fixedCacheKey: 'LoadData',
  });

  useLayoutEffect(() => {
    if (query !== '') {
      const timeNow = Date.now();
      setRequestTimeStart(timeNow);
      getResp({ body: { query, variables: variables ? variables : undefined }, headers: headers });
    }
  }, [query, variables, headers]);

  useEffect(() => {
    const tabInfo = tabs.filter((item) => item.id == activeTabId);
    if (!isLoading) {
      setPreviousActiveTabId(activeTabId);
    }
    if (tabInfo.length === 1 && tabInfo[0]) {
      if (tabInfo[0].responseCode) {
        setResponse(tabInfo[0].responseCode.response);
      } else {
        setResponse(undefined);
      }
    } else {
      setResponse(undefined);
    }
  }, [activeTabId]);

  useEffect(() => {
    if (isLoading) {
      setResponse('');
    } else {
      setPreviousActiveTabId(activeTabId);
    }
  }, [isLoading]);

  const prepareData = (stringData: string) => {
    const time = Date.now() - requestTimeStart;
    const size = new TextEncoder().encode(stringData).length;
    let status = isSuccess ? 200 : 400;

    if (isFetchBaseQueryError(error)) {
      status = error.status as number;
    }
    if (stringData && time && size && status) {
      if (previousActiveTabId === activeTabId && stringData) {
        setResponse(stringData);
      }
      const responseData: IResponse = {
        time,
        size,
        status,
        response: stringData,
      };
      dispatch(
        updateActiveTab({ code: responseData, isRequest: false, activeId: previousActiveTabId })
      );
    }
  };

  useEffect(() => {
    prepareData(JSON.stringify(error, null, '  '));
  }, [error]);

  useEffect(() => {
    prepareData(JSON.stringify(data, null, '  '));
  }, [data]);

  return (
    <div className="font-SourceCodePro text-color-documentation-primary">
      {response && response.length && (
        <div className="relative">
          <ResponseButtons response={response} />
          <pre className="break-all font-SourceCodePro whitespace-pre-wrap max-h-[60vh] overflow-auto text-sm">
            {response ? response : ''}
          </pre>
        </div>
      )}
    </div>
  );
};
