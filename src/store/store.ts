import * as toolkitRaw from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { graphQl } from './api';
import documentReducer from './reducers/document/slice';
import editorReducer from './reducers/editor/slice';
import editorTabReducer from './reducers/editorTabs/slice';
import authReducer from './reducers/auth/authSlice';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { combineReducers, configureStore } = ((toolkitRaw as TypeToolkitRaw).default ??
  toolkitRaw) as typeof toolkitRaw;

const rootReducer = combineReducers({
  document: documentReducer,
  editor: editorReducer,
  editorTab: editorTabReducer,
  auth: authReducer,
  [graphQl.reducerPath]: graphQl.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(graphQl.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
