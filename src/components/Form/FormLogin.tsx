import { Stack } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import TextFieldStyled from '../ui/StyledInput/StyledInput';
import Image from 'next/image';
import Button from '@mui/material/Button';
import passwordIcon from '@/assets/images/password-icon.svg';
import mailIcon from '@/assets/images/mail-icon.svg';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';

import { FormAuthType } from '@/types/types';
import { useAppDispatch } from '@/store/hooks';
import { authActions } from '@/store/reducers/auth/authSlice';
import { KindForm } from '@/types/enums';
const validationSchem = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

type Props = {
  onSubmit: (data: FormAuthType) => void;
};

const FormLogin = ({ onSubmit }: Props) => {
  const methods = useForm<FormAuthType>({
    mode: 'all',
    resolver: yupResolver(validationSchem),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useAppDispatch();
  const hadleChangeType = () => {
    dispatch(authActions.changeKindOfForm(KindForm.signin));
  };

  const formSubmit: SubmitHandler<FormAuthType> = (data: FormAuthType) => {
    onSubmit(data);
    methods.reset();
  };
  return (
    <form onSubmit={methods.handleSubmit(formSubmit)}>
      <FormProvider {...methods}>
        <Stack spacing={2}>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">Log in</h2>
            <p className="text-xs">
              New user?{' '}
              <span
                onClick={hadleChangeType}
                className="cursor-pointer text-color-purple hover:underline decoration-1"
              >
                Let&apos;s sign in
              </span>
            </p>
          </div>

          <TextFieldStyled
            name="email"
            label="Email Address"
            image={<Image alt="" src={mailIcon} className="w-[1.2rem]" />}
          />
          <TextFieldStyled
            name="password"
            label="Password"
            type="password"
            image={<Image alt="" src={passwordIcon} className="w-[1rem]" />}
          />

          <Button
            type="submit"
            variant="contained"
            className="bg-color-purple font-semibold normal-case text-[14px] w-full rounded-b h-[42px] border border-color-border-dark-purple mb-[19px] hover:bg-color-hover-button-purple"
          >
            Log in
          </Button>
        </Stack>
      </FormProvider>
    </form>
  );
};
export default FormLogin;
