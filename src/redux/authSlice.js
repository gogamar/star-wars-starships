import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const VITE_REQRES = import.meta.env.VITE_REQRES;

const initialState = {
  userId: localStorage.getItem("userId") || null,
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// Async thunk for signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    password = "pistol"; // Default password for login after signup
    try {
      const response = await axios.post(`${VITE_REQRES}/users`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Dispatch loginUser after successful signup
      await dispatch(loginUser({ email, password }));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue, getState }) => {
    try {
      const loginResponse = await axios.post(`${VITE_REQRES}/login`, {
        email,
        password,
      });
      const token = loginResponse.data.token;

      if (!token) {
        return rejectWithValue("Login failed: No token returned");
      }

      // Access users from the current state
      const users = getState().users.users; // Ensure users are loaded in state
      const user = users.find((u) => u.email === email);

      // Save token and email to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);

      if (!user) {
        return rejectWithValue("User not found in the user list");
      }

      return { user, token };
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
    setCredentials: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    // Logout user and clear data
    logout: (state) => {
      state.userId = null;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup reducers
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login reducers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.userId = user.id;
        state.token = token;
        state.user = user;
        state.loading = false;

        // Save data to localStorage
        localStorage.setItem("userId", user.id);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
