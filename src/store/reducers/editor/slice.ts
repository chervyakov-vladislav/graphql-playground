import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface PayloadParams {
  query: string;
  variables?: string;
}

const initialState: PayloadParams = {
  query: '',
  variables: '',
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<PayloadParams>) => {
      state.query = payload.query;
      state.variables = payload.variables;
    },

    setQueryBody: (state, { payload }: PayloadAction<string>) => {
      state.query = payload;
    },

    setQueryVariables: (state, { payload }: PayloadAction<string>) => {
      state.variables = payload;
    },
  },
});

export const selectEditor = (state: RootState) => state.editor;

export const { setQuery, setQueryBody, setQueryVariables } = editorSlice.actions;

export default editorSlice.reducer;