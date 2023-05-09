import React from 'react';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { LangSwitch } from '@/components/ui/LangSwitch/LangSwitch';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { KindForm } from '@/types/enums';
import { authActions } from '@/store/reducers/auth/authSlice';
import { useRouter } from 'next/router';
interface IProps {
  isBurger: boolean;
  classes: string;
  closeBurger?: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const HeaderMenu = (props: IProps) => {
  const { kindOfForm, id } = useAppSelector((state) => state.auth);
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
          router.push('/auth');

          break;
        case 'logout':
          dispatch(authActions.changeKindOfForm(KindForm.login));
          dispatch(authActions.removeUser());
          router.push('/');
          break;
        case 'signin':
          dispatch(authActions.changeKindOfForm(KindForm.signin));
          router.push('/auth');
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
        <Button
          name="logout"
          variant="contained"
          className="bg-color-dark-blue font-semibold h-[28px] normal-case text-[14px] hover:bg-color-dark-blue-hover"
          onClick={handleClick}
        >
          Log out
        </Button>
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
            Sign in
          </Button>
          <Button
            name="login"
            variant="contained"
            className={`font-SourceSansPro font-semibold leading-5text-white hover:bg-color-dark-blue-hover h-[28px] normal-case text-[14px] ${
              kindOfForm == KindForm.login ? 'bg-color-dark-blue ' : 'bg-transparent'
            }`}
            onClick={handleClick}
          >
            Log in
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
        <LangSwitch defaultChecked />
        <Typography sx={{ color: '#ffffff' }}>en</Typography>
      </Stack>
    </Stack>
  );
};

export default HeaderMenu;
