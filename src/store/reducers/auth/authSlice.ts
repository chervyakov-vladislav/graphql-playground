import { KindForm } from '@/types/enums';
import { createSlice } from '@reduxjs/toolkit';

interface Auth {
  id: string | null;
  token: string | null;

  kindOfForm: KindForm;
}

const initialState: Auth = {
  id: null,
  token: null,
  kindOfForm: KindForm.login,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.id = null;
      state.token = null;
    },
    changeKindOfForm(state, action) {
      state.kindOfForm = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
