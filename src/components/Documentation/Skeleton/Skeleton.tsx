import React from 'react';
import { Skeleton } from '@mui/material';

export const DocumentSkeleton = () => {
  return (
    <>
      {[...new Array(7)].map((_, index) => (
        <Skeleton key={index} variant="rounded" width={300} height={20} className="mt-3" />
      ))}
    </>
  );
};
