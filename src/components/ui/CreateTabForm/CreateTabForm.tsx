import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/redux';
import { editorTabSlice } from '@/store/reducers/editorTabs/slice';

type tabNameForm = {
  tabName: string;
};

interface IProps {
  closeModalFnc: () => void;
}

export function CreateTabForm(props: IProps) {
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
        Enter tab name
      </h2>
      <TextField
        className="mb-2.5"
        size="small"
        fullWidth
        id="outlined-basic"
        label="Tab name"
        variant="outlined"
        {...register('tabName')}
      />
      <Button
        type="submit"
        variant="contained"
        className="bg-color-purple font-semibold normal-case max-w-[100px] text-[14px] w-full rounded-b h-[42px] border border-color-border-dark-purple hover:bg-color-hover-button-purple"
      >
        Add tab
      </Button>
    </form>
  );
}
