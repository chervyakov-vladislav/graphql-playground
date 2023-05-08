import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface PayloadParams {
  tabs: Array<tab>;
  ids: Array<number>;
  count: number;
  activeTabId: number;
}

interface tab {
  id: number;
  name: string;
  requestCode: string;
  responseCode: string;
}

const initialState: PayloadParams = {
  tabs: [
    {
      id: 1,
      name: 'ExampleQuery',
      requestCode: '',
      responseCode: '',
    },
    {
      id: 2,
      name: 'ExampleQuery',
      requestCode: '',
      responseCode: '',
    },
  ],
  ids: [0],
  count: 1,
  activeTabId: 1,
};

export const editorTabSlice = createSlice({
  name: 'editorTabs',
  initialState,
  reducers: {
    addTab: (state) => {
      let newId = 1;
      while (state.ids.includes(newId)) {
        newId += 1;
      }
      state.count += 1;
      state.tabs.push({
        id: newId,
        name: `Unnamed-${state.count + 1}`,
        requestCode: '',
        responseCode: '',
      });
      state.activeTabId = newId;
    },
    setActiveTab: (state, action) => {
      state.activeTabId = action.payload;
    },
  },
});

export const selectEditor = (state: RootState) => state.editorTab;

export const { addTab } = editorTabSlice.actions;

export default editorTabSlice.reducer;
