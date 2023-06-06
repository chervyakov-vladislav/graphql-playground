import React from 'react';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import LangSwitch from '@/components/ui/LangSwitch/LangSwitch';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { KindForm } from '@/types/enums';
import { authActions } from '@/store/reducers/auth/authSlice';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase.config';
import { useTranslation } from 'next-i18next';

interface IProps {
  isBurger: boolean;
  classes: string;
  closeBurger?: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const HeaderMenu = (props: IProps) => {
  const { t } = useTranslation();
  const { kindOfForm, id, login } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleClick = (
    event: React.KeyboardEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (event.target instanceof HTMLButtonElement && event.target.name) {
      switch (event.target?.name) {
        case 'login':
          dispatch(authActions.changeKindOfForm(KindForm.login));
          router.push(`/auth`, `/auth`, { locale: router.locale });

          break;
        case 'logout':
          signOut(auth);
          dispatch(authActions.changeKindOfForm(KindForm.login));
          dispatch(authActions.removeUser());
          router.push(`/`, `/`, { locale: router.locale });
          break;
        case 'signin':
          dispatch(authActions.changeKindOfForm(KindForm.signin));
          router.push(`/auth`, `/auth`, { locale: router.locale });
          break;
      }
    }

    if (props.closeBurger) props.closeBurger(event);
  };

  return (
    <Stack
      direction={props.isBurger ? 'column' : 'row'}
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={`${props.classes}`}
    >
      {id ? (
        <>
          <p className="font-SourceSansPro text-white cursor-default">{login}</p>
          <Button
            name="logout"
            variant="contained"
            className="bg-color-dark-blue font-semibold h-[28px] normal-case text-[14px] hover:bg-color-dark-blue-hover"
            onClick={handleClick}
          >
            {t('header.logout')}
          </Button>
        </>
      ) : (
        <>
          <Button
            name="signin"
            variant="contained"
            className={`font-SourceSansPro font-semibold text-white leading-5 h-[28px] normal-case text-[14px] hover:bg-color-dark-blue-hover ${
              kindOfForm == KindForm.signin ? 'bg-color-dark-blue ' : 'bg-transparent'
            }`}
            onClick={handleClick}
          >
            {t('header.signin')}
          </Button>
          <Button
            name="login"
            variant="contained"
            className={`font-SourceSansPro font-semibold leading-5text-white hover:bg-color-dark-blue-hover h-[28px] normal-case text-[14px] ${
              kindOfForm == KindForm.login ? 'bg-color-dark-blue ' : 'bg-transparent'
            }`}
            onClick={handleClick}
          >
            {t('header.login')}
          </Button>
        </>
      )}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{
          margin: '0 auto',
        }}
      >
        <Typography sx={{ color: '#ffffff' }}>ru</Typography>
        <LangSwitch />
        <Typography sx={{ color: '#ffffff' }}>en</Typography>
      </Stack>
    </Stack>
  );
};

export default HeaderMenu;
