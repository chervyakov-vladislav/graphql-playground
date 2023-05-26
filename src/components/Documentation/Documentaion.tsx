import { Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import Form from './Form/Form';
import InfoBlock from './InfoBlock/InfoBlock';

const Documentaion = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        fontFamily={'Source Sans Pro'}
        borderBottom={1}
        paddingBottom={'10px'}
        component="h2"
        fontWeight={600}
        fontSize={18}
        className="border-color-heading-border text-color-documentation-primary"
      >
        {t('graphql_page.docs.title')}
      </Typography>
      <Form />
      <InfoBlock />
    </>
  );
};

export default Documentaion;
