import { useState } from 'react';
import { TextField, Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectDocument,
  setFirstLoad,
  setNewLink,
  resetNav,
} from '@/store/reducers/document/slice';
import { useGetDataMutation } from '@/store/api';
import { getIntrospectionQuery } from '@/queries/introspectionQuery';

const Form = () => {
  const { link, firstLoad } = useAppSelector(selectDocument);
  const [value, setValue] = useState(link);
  const dispatch = useAppDispatch();
  const [getData] = useGetDataMutation({
    fixedCacheKey: 'Introspection',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (link !== value || firstLoad) {
      dispatch(setNewLink(value));
      getData({
        body: {
          query: getIntrospectionQuery(),
        },
      });
      dispatch(setFirstLoad());
      dispatch(resetNav());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(() => e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-9">
      <TextField
        value={value}
        variant="standard"
        className="font-SourceSansPro text-[1rem] max-w-sm w-full flex-1"
        size="small"
        onChange={handleChange}
      />
      <Button
        sx={{
          height: '28px',
          textTransform: 'none',
          width: '230px',
        }}
        className={'truncate mt-2'}
        variant="contained"
        type="submit"
      >
        <p className={'truncate w-[200px]'}>Get documentation</p>
      </Button>
    </form>
  );
};

export default Form;
