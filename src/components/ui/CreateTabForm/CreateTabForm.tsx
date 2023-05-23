import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/redux';
import { editorTabSlice } from '@/store/reducers/editorTabs/slice';
import { useTranslation } from 'react-i18next';

type tabNameForm = {
  tabName: string;
};

interface IProps {
  closeModalFnc: () => void;
}

export function CreateTabForm(props: IProps) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<tabNameForm>({
    mode: 'onSubmit',
    defaultValues: {
      tabName: '',
    },
  });

  const dispatch = useAppDispatch();
  const { addTab } = editorTabSlice.actions;
  const submitHandler = (data: tabNameForm) => {
    props.closeModalFnc();
    dispatch(addTab(data.tabName));
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={'mx-auto flex flex-col justify-center items-center m-5'}
    >
      <h2 className={'font-SourceSansPro text-xl text-color-documentation-primary m-0 mb-2.5'}>
        {t('graphql_page.add_tab.enter_tab')}
      </h2>
      <TextField
        className="mb-2.5"
        size="small"
        fullWidth
        id="outlined-basic"
        label={t('graphql_page.add_tab.tab_name')}
        variant="outlined"
        {...register('tabName')}
      />
      <Button
        type="submit"
        variant="contained"
        className="bg-color-purple font-semibold normal-case max-w-[150px] text-[14px] w-full rounded-b h-[42px] border border-color-border-dark-purple hover:bg-color-hover-button-purple"
      >
        {t('graphql_page.add_tab.add_tab')}
      </Button>
    </form>
  );
}
