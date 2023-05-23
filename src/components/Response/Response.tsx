import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectEditor } from '@/store/reducers/editor/slice';
import { ICustomError, useGetDataMutation } from '@/store/api';
import { updateActiveTab } from '@/store/reducers/editorTabs/slice';
import { isErrorWithMessage, isFetchBaseQueryError } from '@/utils/helpers';
import { ResponseButtons } from '@/components/Response/ResponseButtons/ResponseButtons';

export const Response = () => {
  // берем из слайса сформированный query, variables, headers в редакторе
  // либо уже готвый ответ, зависит от реализации
  const { activeTabId, tabs } = useAppSelector((state) => state.editorTab);
  const [previousActiveTabId, setPreviousActiveTabId] = useState<number | undefined>(activeTabId);
  const dispatch = useAppDispatch();
  const { query, variables } = useAppSelector(selectEditor);
  const [response, setResponse] = useState<string | undefined>();
  const [getResp, { data, isSuccess, isLoading, isError, error }] = useGetDataMutation();

  useLayoutEffect(() => {
    if (query !== '') {
      getResp({ query, variables: variables ? variables : undefined });
    }
  }, [query]);

  useEffect(() => {
    const tabInfo = tabs.filter((item) => item.id == activeTabId);
    if (!isLoading) {
      setPreviousActiveTabId(activeTabId);
    }
    if (tabInfo.length === 1 && tabInfo[0]) {
      if (tabInfo[0].responseCode) {
        setResponse(tabInfo[0].responseCode);
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

  useEffect(() => {
    const stringData = JSON.stringify(data, null, '  ');
    if (previousActiveTabId === activeTabId) {
      setResponse(stringData);
    }
    dispatch(
      updateActiveTab({ code: stringData, isRequest: false, activeId: previousActiveTabId })
    );
  }, [data]);

  return (
    <div className="font-SourceCodePro text-color-documentation-primary">
      {isLoading && activeTabId === previousActiveTabId && <div>skeleton loading</div>}
      {isSuccess && response?.length && (
        <div className="relative">
          <ResponseButtons response={response} />
          <pre className="break-all font-SourceCodePro whitespace-pre-wrap h-[65vh] overflow-auto text-sm">
            {response ? response : ''}
          </pre>
        </div>
      )}
      {isError && error && activeTabId === previousActiveTabId && (
        <div className="text-color-text-bright-red">
          <p>Error status: {isFetchBaseQueryError(error) && error.status}</p>
          <p>
            {isErrorWithMessage(error) && (error as unknown as ICustomError).data.errors[0].message}
          </p>
        </div>
      )}
    </div>
  );
};
