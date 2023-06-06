import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { IntrospectionQuery } from '@/types/intorspectionTypes';

interface InitialState {
  link: string;
  firstLoad: boolean;
  isRoot: boolean;
  schema: IntrospectionQuery | null;
  currentType: string;
  navigationStack: string[];
}

const initialState: InitialState = {
  link: 'https://api.escuelajs.co/graphql',
  schema: null,
  firstLoad: true,
  isRoot: true,
  currentType: '',
  navigationStack: ['Root'],
};

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setNewLink: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
    setFirstLoad: (state) => {
      state.firstLoad = false;
    },
    setSchema: (state, action: PayloadAction<{ data: IntrospectionQuery }>) => {
      (state.schema as IntrospectionQuery) = action.payload.data as IntrospectionQuery;
      state.isRoot = true;
      state.currentType = '';
    },
    setCurrentType: (state, action: PayloadAction<string>) => {
      state.currentType = action.payload;
      state.navigationStack.push(action.payload);
    },
    setRoot: (state, action: PayloadAction<boolean>) => {
      state.isRoot = action.payload;
    },
    backNavigation: (state) => {
      state.navigationStack.pop();
      if (state.navigationStack.length === 1) {
        state.isRoot = true;
        state.currentType = '';
        state.navigationStack = ['Root'];
      } else {
        state.currentType = state.navigationStack[state.navigationStack.length - 1];
      }
    },
    resetNav: (state) => {
      state.isRoot = true;
      state.currentType = '';
      state.navigationStack = ['Root'];
    },
  },
});

export const selectDocument = (state: RootState) => state.document;

export const {
  setNewLink,
  setFirstLoad,
  setSchema,
  setCurrentType,
  setRoot,
  backNavigation,
  resetNav,
} = documentSlice.actions;

export default documentSlice.reducer;
