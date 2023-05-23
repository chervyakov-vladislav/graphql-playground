import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { authActions } from '@/store/reducers/auth/authSlice';
import { KindForm } from '@/types/enums';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'next-i18next';

export const MainAuthBlock = () => {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleClick = (
    event: React.KeyboardEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (event.target instanceof HTMLButtonElement && event.target.name) {
      if (id) {
        router.push(`/graphql`, `/graphql`, { locale: router.locale });
      } else {
        switch (event.target?.name) {
          case 'login':
            dispatch(authActions.changeKindOfForm(KindForm.login));
            break;
          case 'signin':
            dispatch(authActions.changeKindOfForm(KindForm.signin));
            break;
        }
        router.push(`/auth`, `/auth`, { locale: router.locale });
      }
    }
  };

  return (
    <div>
      <div className={'px-[3.7%]'}>
        <h2 className={'font-SourceSansPro font-semibold text-4xl text-color-bright-black'}>
          {t('welcome_page.form.welcome')}
        </h2>
      </div>
      {id && (
        <>
          <div className={'mb-14'}>
            <p
              className={
                'font-SourceSansPro max-w-[181px] text-sm leading-5 text-black my-0 mx-auto'
              }
            >
              {t('welcome_page.form.desc_authed')}
            </p>
          </div>
          <Button
            variant="contained"
            name="loginin"
            onClick={handleClick}
            className={
              'bg-color-purple font-semibold normal-case text-[14px] w-full rounded-b h-[42px] border border-color-border-dark-purple mb-[19px] hover:bg-color-hover-button-purple'
            }
          >
            {t('welcome_page.form.editor_btn')}
          </Button>
        </>
      )}
      {!id && (
        <>
          <div className={'mb-14'}>
            <p
              className={
                'font-SourceSansPro max-w-[181px] text-sm leading-5 text-black my-0 mx-auto'
              }
            >
              {t('welcome_page.form.desc')}
            </p>
          </div>
          <Button
            variant="contained"
            name="loginin"
            onClick={handleClick}
            className={
              'bg-color-purple font-semibold normal-case text-[14px] w-full rounded-b h-[42px] border border-color-border-dark-purple mb-[19px] hover:bg-color-hover-button-purple'
            }
          >
            {t('welcome_page.form.login')}
          </Button>
          <Button
            variant="contained"
            name="signin"
            onClick={handleClick}
            className={
              'bg-transparent text-color-bright-black font-semibold normal-case text-[14px] w-full rounded-b h-[42px] border border-transparent shadow-none hover:border-color-bright-black hover:bg-transparent'
            }
          >
            {t('welcome_page.form.signin')}
          </Button>
        </>
      )}
    </div>
  );
};
