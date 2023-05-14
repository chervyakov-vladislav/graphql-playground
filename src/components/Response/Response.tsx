import React, { useEffect, useLayoutEffect } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { selectEditor } from '@/store/reducers/editor/slice';
import { useGetDataMutation } from '@/store/api';
import { prettifyResponse } from '@/utils/prettifyResponse';

export const Response = () => {
  // берем из слайса сформированный query, variables, headers в редакторе
  // либо уже готвый ответ, зависит от реализации
  const { query, variables } = useAppSelector(selectEditor);
  const [getResp, { data, isSuccess, isLoading }] = useGetDataMutation();

  useLayoutEffect(() => {
    getResp({ query, variables: variables ? variables : undefined });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log(prettifyResponse(JSON.stringify(data, null, '  ')));
    }
  }, [data]);

  return (
    <div className="flex mt-[8px] min-h-[78vh]">
      <div className="p-8 grow">
        <h3 className="text-black m-0 p-0 font-SourceSansPro">Response</h3>
        {isLoading ? <div>skeleton loading</div> : <div>response</div>}
      </div>
    </div>
  );
};
