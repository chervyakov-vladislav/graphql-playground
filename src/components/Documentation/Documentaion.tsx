import { Button, Typography } from '@mui/material';

import SchemaNaviagation from './SchemaNavigation/SchemaNaviagation';
import BackButton from './BackButton/BackButton';
import Arguments from './Arguments/Arguments';
import Fields from './Fields/Fields';
import Root from './Root/Root';

import { useAppSelector } from '@/store/hooks';
import { selectDocument } from '@/store/reducers/document/slice';

const Documentaion = () => {
  const { isRoot } = useAppSelector(selectDocument);

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
        Documentation
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
