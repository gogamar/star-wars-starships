import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const VITE_REQRES = import.meta.env.VITE_REQRES;

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${VITE_REQRES}/login`, {
        email,
        password,
      });
      // Assuming ReqRes returns token on login
      if (response.data.token) {
        return { user: response.data, token: response.data.token }; // Return user and token
      }
      return rejectWithValue("Login failed: No token returned");
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Async thunk for signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${VITE_REQRES}/users`, {
        email,
        password,
        first_name: firstName, // Assuming the API uses snake_case
        last_name: lastName, // Adjust according to API spec
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null; // Clear the token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user; // Set the user object
        state.token = action.payload.token; // Set the token
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload; // Set the new user
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
