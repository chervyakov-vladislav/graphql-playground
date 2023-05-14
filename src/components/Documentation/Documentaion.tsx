import { Button, Typography } from '@mui/material';
import SchemaNaviagation from './SchemaNavigation/SchemaNaviagation';
import BackButton from './BackButton/BackButton';
import Arguments from './Arguments/Arguments';
import Fields from './Fields/Fields';
import { useGetDataMutation } from '../../store/api';

const Documentaion = () => {
  const QUERY = {
    query: `{
    __schema {
      queryType {
        fields {
          name
        }
      }
    }
  }`,
  };

  const [getData, { data }] = useGetDataMutation();

  const handleClick = () => {
    getData(QUERY);
  };

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
      <div className="pr-4">
        <SchemaNaviagation />
        <BackButton />
        <Arguments />
        <Fields />
        <Button onClick={handleClick}>Загрузить</Button>
        <pre className="break-all whitespace-pre-wrap">
          {data ? JSON.stringify(data, null, '  ') : 'data template'}
        </pre>
      </div>
    </>
  );
};

export default Documentaion;
