import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { KindForm } from '@/types/enums';
import FormLogin from './FormLogin';
import FormSignin from './FormSignin';
import { FormAuthType } from '@/types/types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { authActions } from '@/store/reducers/auth/authSlice';
import { firebaseAuth } from 'firebase.config';
import Router from 'next/router';

const FormAuth = () => {
  const { kindOfForm } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleSubmit = (data: FormAuthType) => {
    if (kindOfForm === KindForm.login) {
      signInWithEmailAndPassword(firebaseAuth, data.email, data.password)
        .then(({ user }) => {
          dispatch(authActions.setUser({ id: user.uid, token: user.refreshToken }));
          Router.push('/graphql');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);

          alert('no such user');
        });
    }
    if (kindOfForm === KindForm.signin) {
      createUserWithEmailAndPassword(firebaseAuth, data.email, data.password)
        .then(({ user }) => {
          dispatch(authActions.setUser({ id: user.uid, token: user.refreshToken }));
          Router.push('/graphql');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
        });
    }
  };

  if (kindOfForm === KindForm.login) return <FormLogin onSubmit={handleSubmit} />;
  return <FormSignin onSubmit={handleSubmit} />;
};
export default FormAuth;
