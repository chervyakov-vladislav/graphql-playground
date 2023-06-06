import React, { ReactNode, useState } from 'react';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  image: ReactNode;
} & TextFieldProps;
const StyledField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#383D5B',
    top: '0',
  },
  '& label': {
    color: '#383D5B',
    fontSize: '1rem',
    fontFamily: 'Source Sans Pro',
  },
  '& .MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
    transform: 'translate(42px, 8px)',
  },
  '& .MuiOutlinedInput-input': {
    paddingLeft: '8px',
  },

  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    '& fieldset': {
      borderColor: '#CAD0D8',
    },
    '&:hover fieldset': {
      borderColor: '#B2B9C3',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#B2B9C3',
      borderWidth: '1px',
    },
  },
});

const TextFieldStyled = ({ name, image, ...props }: Props) => {
  const [shrink, setShrink] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <StyledField
          {...props}
          {...field}
          onFocus={() => setShrink(true)}
          // onBlur={(e) => {
          //   !e.target.value && setShrink(false);
          //   props.onBlur;
          // }}11
          InputProps={{
            startAdornment: <InputAdornment position="start">{image}</InputAdornment>,
          }}
          InputLabelProps={{
            shrink: shrink,
          }}
          variant="outlined"
          className=" font-SourceSansPro text-[1rem]"
          size="small"
          error={!!errors[name]}
          helperText={errors[name] ? (errors[name]?.message as unknown as string) : ''}
        />
      )}
    />
  );
};

export default TextFieldStyled;
