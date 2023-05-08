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
      requestCode: 'First',
      responseCode: 'First',
    },
    {
      id: 2,
      name: 'ExampleQuery-2',
      requestCode: 'second',
      responseCode: 'Second',
    },
  ],
  ids: [1],
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
      state.ids.push(newId);
      state.tabs.push({
        id: newId,
        name: `Unnamed-${state.count}`,
        requestCode: '',
        responseCode: '',
      });
      state.count += 1;
      state.activeTabId = newId;
    },
    setActiveTab: (state, action) => {
      state.activeTabId = action.payload;
    },
    deleteTab: (state, action) => {
      const index = state.tabs.findIndex((item) => item.id == action.payload);
      console.log(index);
      if (state.activeTabId == action.payload) {
        state.activeTabId =
          index === 1
            ? state.tabs[1]?.id
            : state.tabs?.[index + 1]
            ? state.tabs?.[index + 1]?.id
            : state.tabs?.[index - 1]?.id
            ? state.tabs?.[index - 1]?.id
            : 1;
      }
      state.tabs.splice(index, 1);
      if (state.tabs.length === 0) {
        state.tabs.push(...initialState.tabs);
      }
    },
  },
});

export const selectEditor = (state: RootState) => state.editorTab;

export const { addTab } = editorTabSlice.actions;

export default editorTabSlice.reducer;
