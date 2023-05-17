import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { HYDRATE } from 'next-redux-wrapper';
import { Data, Fields, Args, NavObj } from '@/types/schema-types';

interface InitialState {
  nav: NavObj[];
  schema: Data | null;
  isRoot: boolean;
  fields: Fields[];
  args: Args[];
}

const initialState: InitialState = {
  nav: [
    {
      name: 'root',
      prevSchema: null,
      prevFields: [],
      prevArgs: [],
    },
  ],
  isRoot: true,
  schema: null,
  fields: [],
  args: [],
};

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    addNavItem: (state, action: PayloadAction<NavObj>) => {
      state.nav.push(action.payload);
    },
    sliceNavItems: (state, action: PayloadAction<number>) => {
      state.nav = state.nav.slice(0, action.payload + 1);
    },
    deleteNavItem: (state) => {
      state.nav.pop();
    },
    addSchema: (state, action: PayloadAction<Data>) => {
      state.schema = action.payload;
    },
    setRoot: (state, action: PayloadAction<boolean>) => {
      state.isRoot = action.payload;
    },
    resetRoot: (state) => {
      state.nav = [
        {
          name: 'root',
          prevSchema: null,
          prevFields: [],
          prevArgs: [],
        },
      ];
    },
    setFields: (state, action: PayloadAction<Fields[]>) => {
      state.fields = action.payload;
    },
    setArgs: (state, action: PayloadAction<Args[]>) => {
      state.args = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        if (action.payload.document.nav) {
          state.nav = action.payload.document.nav;
        }

        if (action.payload.document.schema) {
          state.schema = action.payload.document.schema;
        }

        return state;
      }
    );
  },
});

export const selectDocument = (state: RootState) => state.document;

export const {
  addNavItem,
  addSchema,
  setRoot,
  setFields,
  setArgs,
  resetRoot,
  deleteNavItem,
  sliceNavItems,
} = documentSlice.actions;

export default documentSlice.reducer;
