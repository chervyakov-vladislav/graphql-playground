import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import HeaderMenu from '@/components/ui/HeaderMenu/HeaderMenu';

const HeaderBurger = () => {
  const [anchor, setAnchor] = useState(false);
  const toggleDrawer =
    (open = false) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setAnchor(open);
    };
  return (
    <div className={'block sm:hidden '}>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ color: '#ffffff' }}></MenuIcon>
      </IconButton>
      <Drawer
        anchor="right"
        open={anchor}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#1B2240',
            width: '200px',
            paddingTop: '20px',
          },
        }}
      >
        <HeaderMenu isBurger={true} classes={''} closeBurger={toggleDrawer(false)} />
      </Drawer>
    </div>
  );
};
export default HeaderBurger;
