import { Button } from '@mui/material';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import React from 'react';

export const EditorHeader = () => {
  return (
    <div className="flex font-SourceSansPro justify-between">
      <h3 className="text-black m-0 p-0">Operation</h3>
      <Button
        sx={{
          height: '28px',
          textTransform: 'none',
        }}
        variant="contained"
      >
        <PlayArrowOutlinedIcon />
        ExampleQuery
      </Button>
    </div>
  );
};
