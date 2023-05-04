import React from 'react';
import { ITeamData } from '../../Footer/Footer';
import github_icon from '@/assets/images/github-icon.svg';
import Image from 'next/image';

interface IProps {
  data: ITeamData[];
}

const FooterSocials: React.FC<IProps> = ({ data }) => {
  return (
    <ul className="flex w-full h-full flex-col row-start-1 row-end-3 md:flex-row md:row-start-auto md:row-end-auto">
      {data.map(({ name, github }) => {
        return (
          <li
            key={name}
            className="group/item border-transparent justify-start pl-[15px] pr-[15px] flex items-center md:justify-center md:border-color-dark-grey border-r-[1px] h-full first:border-l-[1px]"
          >
            <a
              href={github}
              target="_blank"
              className="flex items-center group-hover/item:opacity-80 duration-300"
            >
              <Image alt="git" src={github_icon} />
              <p className="ml-[10px]">{name}</p>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default FooterSocials;
