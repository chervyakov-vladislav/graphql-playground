import Image from 'next/image';

import bg from '@/assets/images/bg.webp';

const Home = () => (
  <>
    <Image
      alt={'bg'}
      src={bg}
      placeholder="blur"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
    />
  </>
);

export default Home;
