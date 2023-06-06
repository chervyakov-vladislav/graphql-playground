import Image from 'next/image';

import schoolLogo from '@/assets/images/rsschool-logo.svg';
import FooterSocials from '../ui/FooterSocials/FooterSocials';

export interface ITeamData {
  name: string;
  github: string;
}

const teamData: ITeamData[] = [
  {
    name: 'Asmeev Daniil',
    github: 'https://github.com/GodPFM',
  },
  {
    name: 'Chervyakov Vladislav',
    github: 'https://github.com/chervyakov-vladislav',
  },
  {
    name: 'Makarova Polina',
    github: 'https://github.com/sunnyfur',
  },
];

export const Footer = (): JSX.Element => {
  return (
    <footer className="font-semibold text-[14px] h-[141px] grid-cols-[minmax(45%,70%)_30%] pl-[2%] pr-[2%] md:h-12 grid md:grid-cols-[minmax(45%,auto)_10%_1fr] items-center bg-color-dark-purple text-white z-10">
      <FooterSocials data={teamData} />
      <p className="flex justify-center row-start-2 md:row-start-auto">2023</p>
      <div className="flex justify-center md:justify-end">
        <a href="https://rs.school/" target="_blank">
          <Image src={schoolLogo} alt={'school-logo'} className="hover:opacity-80 duration-500" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
