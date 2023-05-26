import React, { useEffect } from 'react';

import { setSchema } from '@/store/reducers/document/slice';
import { useGetDataMutation } from '@/store/api';
import { useAppDispatch } from '@/store/hooks';

import Error from './Error/Error';
import { DocumentSkeleton } from './Skeleton/Skeleton';
import Root from './Root/Root';
import Fields from './Fields/Fields';
import BackButton from './BackButton/BackButton';

const InfoBlock = () => {
  const [getData, { data, isSuccess, isLoading }] = useGetDataMutation({
    fixedCacheKey: 'Introspection',
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSchema(data));
    }
  }, [data]);

  return isLoading ? (
    <DocumentSkeleton />
  ) : (
    <>
      {isSuccess ? (
        <div className="mt-3 ml-auto mr-auto max-w-sm w-full 2xl:ml-0 2xl:mr-0 overflow-auto h-[60vh]">
          <Root />
          <BackButton />
          <Fields />
        </div>
      ) : (
        <Error />
      )}
    </>
  );
};

export default InfoBlock;
