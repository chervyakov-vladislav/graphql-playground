import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { KindForm } from '@/types/enums';
import FormLogin from './FormLogin';
import FormSignin from './FormSignin';
import { FormAuthType } from '@/types/types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { authActions } from '@/store/reducers/auth/authSlice';
import { auth } from 'firebase.config';
import Router from 'next/router';
import { Alert, AlertTitle, Backdrop, CircularProgress } from '@mui/material';

const FormAuth = () => {
  const { kindOfForm, isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleSubmit = (data: FormAuthType) => {
    if (kindOfForm === KindForm.login) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(({ user }) => {
          dispatch(authActions.setIsLoading(true));
          dispatch(authActions.setUser({ id: user.uid, token: user.refreshToken }));
          dispatch(authActions.setIsLoading(false));
          Router.push('/graphql');
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
          Router.push('/graphql');
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
          <AlertTitle>Error</AlertTitle>
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
