import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectEditor } from '@/store/reducers/editor/slice';
import { useGetDataMutation } from '@/store/api';
import { updateActiveTab } from '@/store/reducers/editorTabs/slice';

export const Response = () => {
  // берем из слайса сформированный query, variables, headers в редакторе
  // либо уже готвый ответ, зависит от реализации
  const { activeTabId, tabs } = useAppSelector((state) => state.editorTab);
  const [previousActiveTabId, setPreviousActiveTabId] = useState<number | undefined>(activeTabId);
  const dispatch = useAppDispatch();
  const { query, variables } = useAppSelector(selectEditor);
  const [response, setResponse] = useState<string | undefined>();
  const [getResp, { data, isSuccess, isLoading, isError }] = useGetDataMutation();

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
      {isSuccess && (
        <pre className="break-all font-SourceCodePro whitespace-pre-wrap h-[65vh] overflow-auto">
          {response ? response : ''}
        </pre>
      )}
      {isError && activeTabId === previousActiveTabId && <>Error</>}
    </div>
  );
};
