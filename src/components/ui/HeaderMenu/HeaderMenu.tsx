import React from 'react';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { LangSwitch } from '@/components/ui/LangSwitch/LangSwitch';

interface IProps {
  isBurger: boolean;
  classes: string;
  closeBurger?: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const HeaderMenu = (props: IProps) => (
  <Stack
    direction={props.isBurger ? 'column' : 'row'}
    spacing={2}
    justifyContent="center"
    alignItems="center"
    className={`${props.classes}`}
  >
    <Button
      variant="text"
      className="font-SourceSansPro font-semibold text-white leading-5 normal-case text-[14px]"
      onClick={props.closeBurger}
    >
      Sign in
    </Button>
    <Button
      variant="contained"
      className="bg-color-dark-blue font-semibold h-[28px] normal-case text-[14px]"
      onClick={props.closeBurger}
    >
      Log in
    </Button>
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

export default HeaderMenu;
