import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUserData } from '../types/user';
import { COUNTRIES_LIST } from '../utils/constants';
import type { RootState } from './store';

interface UserState {
  forms: IUserData[];
  countries: string[];
}

const initialState: UserState = {
  forms: [],
  countries: COUNTRIES_LIST,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserForm: (state, action: PayloadAction<IUserData>) => {
      state.forms.push(action.payload);
    },
  },
});

export const selectForms = (state: RootState) => state.user.forms;
export const { addUserForm } = userSlice.actions;
export const userReducer = userSlice.reducer;
