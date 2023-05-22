import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Columns from '../components/Columns/Columns';
import { wrapper } from '../store/store';
import { addSchema } from '../store/reducers/document/slice';
import { ROOT_QUERY } from '../queries/introspectionQuery';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Graphql = () => {
  const { id, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !id) router.push(`/`, `/`, { locale: router.locale });
  }, [isLoading, id]);
  return <>{id ? <Columns /> : <></>}</>;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  const baseUrl = 'https://api.escuelajs.co/graphql';

  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ROOT_QUERY,
    }),
  }).then((res) => res.json());
  store.dispatch(addSchema(res));

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], null, ['en', 'ru'])),
    },
  };
});

export default Graphql;
