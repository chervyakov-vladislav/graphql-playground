import React from 'react';
import { useGetDataMutation } from '@/store/api';
import { useTranslation } from 'react-i18next';

const Error = () => {
  const { t } = useTranslation();
  const [getData, { isError }] = useGetDataMutation({
    fixedCacheKey: 'Introspection',
  });
  const [errorText, setErrorText] = React.useState('');

  React.useEffect(() => {
    setErrorText(() => (isError ? t('graphql_page.docs.error') : ''));
  }, [isError, t]);

  return isError ? <div className="ml-auto mr-auto mt-5">{errorText}</div> : null;
};

export default Error;
