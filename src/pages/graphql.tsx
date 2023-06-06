import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Columns from '../components/Columns/Columns';
import { wrapper } from '../store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Graphql = () => {
  const { id, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !id) router.push(`/`, `/`, { locale: router.locale });
  }, [isLoading, id]);
  return <>{id ? <Columns /> : <></>}</>;
};

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], null, ['en', 'ru'])),
    },
  };
});

export default Graphql;
