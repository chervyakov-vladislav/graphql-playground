import React from 'react';
import { Skeleton } from '@mui/material';

export const DocumentSkeleton = () => {
  return (
    <>
      {[...new Array(7)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          height={20}
          className="mt-3 ml-auto  w-full mr-auto 2xl:ml-0 2xl:mr-0"
        />
      ))}
    </>
  );
};
