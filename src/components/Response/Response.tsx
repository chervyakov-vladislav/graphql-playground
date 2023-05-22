import React, { useEffect, useLayoutEffect } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { selectEditor } from '@/store/reducers/editor/slice';
import { useGetDataMutation } from '@/store/api';
import { prettifyResponse } from '@/utils/prettifyResponse';
import { useTranslation } from 'react-i18next';

export const Response = () => {
  // берем из слайса сформированный query, variables, headers в редакторе
  // либо уже готвый ответ, зависит от реализации
  const { query, variables } = useAppSelector(selectEditor);
  const [getResp, { data, isSuccess, isLoading }] = useGetDataMutation();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    getResp({ query, variables: variables ? variables : undefined });
  }, [query]);

  console.log(data);

  return (
    <div className="flex mt-[8px] ">
      <div className="p-8 grow">
        <h3 className="text-black m-0 p-0 font-SourceSansPro">{t('graphql_page.response')}</h3>
        {isLoading ? (
          <div>skeleton loading</div>
        ) : isSuccess ? (
          <pre className="break-all whitespace-pre-wrap h-[65vh] overflow-auto">
            {data ? JSON.stringify(data, null, '  ') : 'data template'}
          </pre>
        ) : (
          <>Errors in response</>
        )}
      </div>
    </div>
  );
};
