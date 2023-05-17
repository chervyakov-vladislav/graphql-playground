import React from 'react';
import { ITeamData } from '@/components/Footer/Footer';
import github_icon from '@/assets/images/github-icon.svg';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

interface IProps {
  data: ITeamData[];
}

type Translation = Array<{ name: string }>;

const FooterSocials: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation();

  const names: Translation = t('footer.team', { returnObjects: true });

  return (
    <ul className="flex w-full h-[97%] flex-col row-start-1 row-end-3 md:flex-row md:row-start-auto md:row-end-auto mb-0 mt-0">
      {data.map(({ name, github }, index) => {
        return (
          <li
            key={name}
            className="group/item border-transparent justify-start pl-[15px] pr-[15px] flex items-center md:justify-center md:border-color-dark-grey border-r-[1px] h-full first:border-l-[1px] max-h-[47px]"
          >
            <a
              href={github}
              target="_blank"
              className="flex items-center group-hover/item:opacity-80 duration-300 no-underline text-white"
            >
              <Image alt="git" src={github_icon} />
              <p className="ml-[10px] mt-0 mb-0">{names[index].name}</p>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default FooterSocials;
