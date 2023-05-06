import React from 'react';
import { MainCodeBlock } from '@/components/Main/MainCodeBlock/MainCodeBlock';
import { MainCodeRequest } from '@/components/Main/MainCodeRequest/MainCodeRequest';
import { MainCodeResponce } from '@/components/Main/MainCodeResponce/MainCodeResponce';
import { MainAuthBlock } from '@/components/Main/MainAuthBlock/MainAuthBlock';
import GraphLogoBlock from '@/components/GraphLogoBlock/GraphLogoBlock';

const Home = () => {
  const request = {
    header: 'Ask for what you want',
    codeBlock: <MainCodeRequest />,
  };
  const response = {
    header: 'Get predictable results',
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

export default Home;
