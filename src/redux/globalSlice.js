import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: null,
  isLoggedIn: false,
  user: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLocation, setLoginStatus, setUser } = globalSlice.actions;
export default globalSlice.reducer;
