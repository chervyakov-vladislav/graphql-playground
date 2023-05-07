import { Typography, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Arguments = () => {
  return (
    <>
      <Typography
        fontFamily={'Source Sans Pro'}
        component="h4"
        className="mb-2 mt-4 flex items-center text-base font-semibold"
      >
        Arguments
      </Typography>
      <Stack>
        <Stack direction="row" alignItems="center">
          <button className="w-6 h-6 mr-2 my-1 flex items-center justify-center hover:bg-white duration-300 rounded group">
            <AddCircleOutlineIcon className="w-5 h-5 stroke-1 fill-color-documentation-secondary group-hover:fill-color-documentation-primary" />
          </button>
          <button className="flex items-center hover:bg-white rounded group px-3 w-full">
            <Typography fontFamily={'Source Code Pro'} className="text-[14px]">
              example:
            </Typography>
            <Typography
              fontFamily={'Source Code Pro'}
              className="ml-2 text-[14px] text-color-documentation-secondary"
            >
              [Example]
            </Typography>
            <ArrowForwardIcon className="w-3 h-3 ml-auto fill-none group-hover:fill-color-documentation-primary" />
          </button>
        </Stack>

        <Stack direction="row" alignItems="center">
          <button className="w-6 h-6 mr-2 my-1 flex items-center justify-center hover:bg-white duration-300 rounded group">
            <AddCircleOutlineIcon className="w-5 h-5 stroke-1 fill-color-documentation-secondary group-hover:fill-color-documentation-primary" />
          </button>
          <button className="flex items-center hover:bg-white rounded group px-3 w-full">
            <Typography fontFamily={'Source Code Pro'} className="text-[14px]">
              example:
            </Typography>
            <Typography
              fontFamily={'Source Code Pro'}
              className="ml-2 text-[14px] text-color-documentation-secondary"
            >
              [Example]
            </Typography>
            <ArrowForwardIcon className="w-3 h-3 ml-auto fill-none group-hover:fill-color-documentation-primary" />
          </button>
        </Stack>

        <Stack direction="row" alignItems="center">
          <button className="w-6 h-6 mr-2 my-1 flex items-center justify-center hover:bg-white duration-300 rounded group">
            <AddCircleOutlineIcon className="w-5 h-5 stroke-1 fill-color-documentation-secondary group-hover:fill-color-documentation-primary" />
          </button>
          <button className="flex items-center hover:bg-white rounded group px-3 w-full">
            <Typography fontFamily={'Source Code Pro'} className="text-[14px]">
              example:
            </Typography>
            <Typography
              fontFamily={'Source Code Pro'}
              className="ml-2 text-[14px] text-color-documentation-secondary"
            >
              [Example]
            </Typography>
            <ArrowForwardIcon className="w-3 h-3 ml-auto fill-none group-hover:fill-color-documentation-primary" />
          </button>
        </Stack>
      </Stack>
    </>
  );
};

export default Arguments;
