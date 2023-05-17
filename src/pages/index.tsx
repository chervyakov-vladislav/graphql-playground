'use client';

import React from 'react';
import { MainCodeBlock } from '@/components/Main/MainCodeBlock/MainCodeBlock';
import { MainCodeRequest } from '@/components/Main/MainCodeRequest/MainCodeRequest';
import { MainCodeResponce } from '@/components/Main/MainCodeResponce/MainCodeResponce';
import { MainAuthBlock } from '@/components/Main/MainAuthBlock/MainAuthBlock';
import GraphLogoBlock from '@/components/GraphLogoBlock/GraphLogoBlock';
import { wrapper } from '@/store/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Home = () => {
  const { t } = useTranslation();
  const request = {
    header: t('welcome_page.ask_for'),
    codeBlock: <MainCodeRequest />,
  };
  const response = {
    header: t('welcome_page.get_results'),
    codeBlock: <MainCodeResponce />,
  };
  return (
    <div className={'bg-gradient-to-br from-[#7c22ce] via-60% via-[#3c1a98] to-[#00197c] w-full'}>
      <div
        className={
          'relative w-full h-full flex justify-around items-center z-10 pr-[3.7%] pl-[3.7%] pt-5 pb-5'
        }
      >
        <MainCodeBlock
          classes={'min-[1470px]:hidden max-[999px]:hidden'}
          items={[request, response]}
        />
        <MainCodeBlock classes={'min-[1470px]:block hidden'} items={[request]} />
        <MainCodeBlock classes={'min-[1470px]:block hidden'} items={[response]} />
        <GraphLogoBlock>
          <MainAuthBlock />
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

export default Home;
