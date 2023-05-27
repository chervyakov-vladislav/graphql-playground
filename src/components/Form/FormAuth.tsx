import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { KindForm } from '@/types/enums';
import FormLogin from './FormLogin';
import FormSignin from './FormSignin';
import { FormAuthType } from '@/types/types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { authActions } from '@/store/reducers/auth/authSlice';
import { auth } from 'firebase.config';
import { useRouter } from 'next/router';
import { Alert, AlertTitle, Backdrop, CircularProgress } from '@mui/material';
import { useTranslation } from 'next-i18next';

const FormAuth = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { kindOfForm, isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleSubmit = (data: FormAuthType) => {
    if (kindOfForm === KindForm.login) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(({ user }) => {
          dispatch(authActions.setIsLoading(true));
          dispatch(authActions.setUser({ id: user.uid, token: user.refreshToken }));
          dispatch(authActions.setIsLoading(false));
          router.push(`/graphql`, `/graphql`, { locale: router.locale });
        })
        .catch((error) => {
          dispatch(authActions.setError(error.message));
          setTimeout(() => dispatch(authActions.clearError()), 5000);
        });
    }
    if (kindOfForm === KindForm.signin) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(({ user }) => {
          dispatch(authActions.setIsLoading(true));
          dispatch(authActions.setUser({ id: user.uid, token: user.refreshToken }));
          router.push(`/graphql`, `/graphql`, { locale: router.locale });
          dispatch(authActions.setIsLoading(false));
        })
        .catch((error) => {
          dispatch(authActions.setError(error.message));
          setTimeout(() => dispatch(authActions.clearError()), 5000);
        });
    }
  };

  return (
    <>
      {kindOfForm === KindForm.login ? (
        <FormLogin onSubmit={handleSubmit} />
      ) : (
        <FormSignin onSubmit={handleSubmit} />
      )}
      {error && (
        <Alert severity="error" className="text-left">
          <AlertTitle>{t('auth_page.error')}</AlertTitle>
          {error}
        </Alert>
      )}
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default FormAuth;
