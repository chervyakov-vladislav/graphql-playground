import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface PayloadParams {
  tabs: Array<ITab>;
  ids: Array<number>;
  unnamedCount: number;
  activeTabId: number;
}

export interface ITab {
  id: number;
  name: string;
  requestCode: Array<Array<string>>;
  responseCode: string | null;
  variablesCode: string;
  headersCode: string | null;
}

const initialState: PayloadParams = {
  tabs: [
    {
      id: 1,
      name: 'ExampleQuery',
      requestCode: [
        ['query', ' ', 'ExampleQuery', ' ', '{'],
        [' ', ' ', 'products', '{'],
        [' ', ' ', ' ', ' ', 'title'],
        [' ', ' ', ' ', ' ', 'price'],
        [' ', ' ', ' ', ' ', 'category', ' ', '{'],
        [' ', ' ', ' ', ' ', ' ', ' ', 'name'],
        [' ', ' ', ' ', ' ', '}'],
        [' ', ' ', '}'],
        ['}'],
      ],
      responseCode: null,
      variablesCode: '',
      headersCode: null,
    },
  ],
  ids: [1],
  unnamedCount: 1,
  activeTabId: 1,
};

export const editorTabSlice = createSlice({
  name: 'editorTabs',
  initialState,
  reducers: {
    addTab: (state, action) => {
      let newId = 1;
      while (state.ids.includes(newId)) {
        newId += 1;
      }
      state.ids.push(newId);
      const name = action.payload === '' ? `Unnamed-${state.unnamedCount}` : action.payload;
      if (name.includes('Unnamed')) {
        state.unnamedCount += 1;
      }
      state.tabs.push({
        id: newId,
        name,
        requestCode: [['']],
        responseCode: null,
        variablesCode: '',
        headersCode: null,
      });
      state.activeTabId = newId;
    },
    setActiveTab: (state, action) => {
      state.activeTabId = action.payload;
    },
    deleteTab: (state, action) => {
      const index = state.tabs.findIndex((item) => item.id == action.payload);
      if (state.activeTabId == action.payload) {
        state.activeTabId =
          index === 1
            ? state.tabs[0]?.id
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
    updateActiveTab: (
      state,
      action: PayloadAction<{
        code: Array<Array<string>> | string;
        isRequest: boolean;
        activeId?: number;
      }>
    ) => {
      const activeTab = action.payload.activeId ?? state.activeTabId;
      let newCode: Array<Array<string>> | string;
      if (action.payload.isRequest) {
        newCode = action.payload.code ?? [['']];
      } else {
        newCode = action.payload.code ?? '';
      }
      state.tabs = state.tabs.map((item) => {
        if (item.id == activeTab) {
          if (action.payload.isRequest && Array.isArray(newCode)) {
            item.requestCode = newCode;
          } else {
            if (typeof newCode === 'string') {
              item.responseCode = newCode;
            }
          }
        }
        return item;
      });
    },
    setVars: (state, action) => {
      console.log(state);
      const activeTab = state.tabs.find((tab) => tab.id === state.activeTabId);
      console.log(activeTab);
      if (activeTab) activeTab.variablesCode = action.payload;
      console.log(state);
    },
  },
});

export const selectEditor = (state: RootState) => state.editorTab;

export const { addTab, updateActiveTab, setVars } = editorTabSlice.actions;

export default editorTabSlice.reducer;
