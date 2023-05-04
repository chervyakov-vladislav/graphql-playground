import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';

export const LangSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
      },
      '& + .MuiSwitch-thumb': {
        backgroundColor: '#1B2240',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    borderRadius: 22 / 2,
    backgroundColor: '#aab4be',
  },
}));
