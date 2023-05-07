import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface InitialState {
  nav: string[];
}
const initialState: InitialState = {
  nav: ['Root', 'Query', 'Example'],
};

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.nav.push(action.payload);
    },
  },
});

export const selectDocument = (state: RootState) => state.document;

export const { addItem } = documentSlice.actions;

export default documentSlice.reducer;
