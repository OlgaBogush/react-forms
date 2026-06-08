import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUserData } from '../types/user';
import { COUNTRIES_LIST } from '../utils/constants';

interface UserState {
  submissions: IUserData[];
  countries: string[];
}

const initialState: UserState = {
  submissions: [],
  countries: COUNTRIES_LIST,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserForm: (state, action: PayloadAction<IUserData>) => {
      state.submissions.push(action.payload);
    },
  },
});

export const { addUserForm } = userSlice.actions;
export const userReducer = userSlice.reducer;
