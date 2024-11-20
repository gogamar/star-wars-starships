import { createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { handleFirebaseError } from "../utils/firebaseErrorUtils";

const initialState = {
  user: null,
  loading: false,
  error: null,
  checking: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    checkingComplete: (state) => {
      state.checking = false;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
      };
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  resetError,
  checkingComplete,
  startLoading,
  stopLoading,
  setUser,
  setError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

// Async thunk for logging in
export const loginUser =
  (email, password, navigate, from) => async (dispatch) => {
    dispatch(startLoading());
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );
      navigate(from, { replace: true });
    } catch (error) {
      const userFriendlyError = handleFirebaseError(error);
      dispatch(setError(userFriendlyError));
    } finally {
      dispatch(stopLoading());
    }
  };

// Async thunk for signing up
export const signupUser =
  (email, password, navigate, from) => async (dispatch) => {
    dispatch(startLoading());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );
      dispatch(loginUser(email, password, navigate, from));
    } catch (error) {
      const userFriendlyError = handleFirebaseError(error);
      dispatch(setError(userFriendlyError));
    } finally {
      dispatch(stopLoading());
    }
  };

// Async thunk for logging out
export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (error) {
    console.error(error);
  }
};
