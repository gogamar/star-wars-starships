import { createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
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
      state.error = "";
    },
    checkingComplete: (state) => {
      state.checking = false;
    },
    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
      };
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
      };
    },
    loginFailure: (state, action) => {
      state.loading = false;
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
  signupStart,
  signupSuccess,
  signupFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

// Async thunk for checking user authentication
export const checkUserAuth = () => async (dispatch) => {
  dispatch(checkingComplete()); // Optional: show UI as checking auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        loginSuccess({
          uid: user.uid,
          email: user.email,
        })
      );
    } else {
      dispatch(logout());
    }
    dispatch(checkingComplete());
  });
};

// Async thunk for logging in
export const loginUser =
  (email, password, navigate, from) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate(from, { replace: true });

      dispatch(
        loginSuccess({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );
      navigate(from, { replace: true });
    } catch (error) {
      const userFriendlyError = handleFirebaseError(error);
      dispatch(loginFailure(userFriendlyError));
    }
  };

// Async thunk for signing up
export const signupUser =
  (email, password, navigate, from) => async (dispatch) => {
    dispatch(signupStart());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(
        signupSuccess({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );

      dispatch(loginUser(email, password, navigate, from));
    } catch (error) {
      const userFriendlyError = handleFirebaseError(error);
      dispatch(signupFailure(userFriendlyError));
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
