import GraphLogoBlock from '@/components/GraphLogoBlock/GraphLogoBlock';
import React, { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';

import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';

const FormAuth = dynamic(() => import('@/components/Form/FormAuth'), {
  loading: () => <CircularProgress color="inherit" />,
});

const Auth = () => {
  const { id, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && id) router.push(`/graphql`, `/graphql`, { locale: router.locale });
  }, [isLoading, id]);
  return (
    <div className={'bg-gradient-to-br from-[#7c22ce] via-60% via-[#3c1a98] to-[#00197c] w-full'}>
      <div
        className={
          'relative w-full h-full flex justify-around items-center z-10 pr-[3.7%] pl-[3.7%] pt-20 pb-5'
        }
      >
        <GraphLogoBlock>
          <FormAuth />
        </GraphLogoBlock>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], null, ['en', 'ru'])),
    },
  };
});

export default Auth;
