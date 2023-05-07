import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

const Divider = () => {
  return (
    <SvgIcon viewBox="0 0 24 24" className="w-2 h-3">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M5.5.75l10.72 10.72a.749.749 0 0 1 .001 1.059l-.001.001L5.5 23.25"
      ></path>
    </SvgIcon>
  );
};

export default Divider;
