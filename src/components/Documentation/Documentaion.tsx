import { Button, Typography } from '@mui/material';

import SchemaNaviagation from './SchemaNavigation/SchemaNaviagation';
import BackButton from './BackButton/BackButton';
import Arguments from './Arguments/Arguments';
import Fields from './Fields/Fields';
import { useGetDataMutation } from '@/store/api';
import Root from './Root/Root';

import { useAppSelector } from '@/store/hooks';
import { selectDocument } from '@/store/reducers/document/slice';
import { useTranslation } from 'react-i18next';

const Documentaion = () => {
  const { isRoot } = useAppSelector(selectDocument);
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
        {t('graphql_page.docs')}
      </Typography>
      {isRoot ? (
        <Root />
      ) : (
        <div className="pr-4">
          <SchemaNaviagation />
          <BackButton />
          <Arguments />
          <Fields />
        </div>
      )}
    </>
  );
};

export default Documentaion;
