import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface PayloadParams {
  body: {
    query: string;
    variables?: string;
  };
  headers?: Record<string, string>;
}

const initialState: PayloadParams = {
  body: {
    query: '',
    variables: '',
  },
  headers: {
    'Content-Type': 'application/json',
  },
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<PayloadParams>) => {
      state.body.query = payload.body.query;
      state.body.variables = payload.body.variables;
    },

    setQueryBody: (state, { payload }: PayloadAction<PayloadParams>) => {
      state.body.query = payload.body.query;
    },

    setQueryVariables: (state, { payload }: PayloadAction<PayloadParams>) => {
      state.body.variables = payload.body.variables;
    },

    setHeaders: (state, { payload }: PayloadAction<PayloadParams>) => {
      state.headers = {
        'Content-Type': 'application/json',
        ...payload.headers,
      };
    },
  },
});

export const selectEditor = (state: RootState) => state.editor;

export const { setQuery, setQueryBody, setQueryVariables, setHeaders } = editorSlice.actions;

export default editorSlice.reducer;
