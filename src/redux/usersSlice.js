import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsersError: (state, action) => {
      state.error = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers, setUsersLoading, setUsersError } = usersSlice.actions;
export default usersSlice.reducer;
