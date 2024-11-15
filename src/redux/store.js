import { configureStore } from "@reduxjs/toolkit";
import starshipsReducer from "./starshipsSlice";
import usersReducer from "./usersSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    starships: starshipsReducer,
    users: usersReducer,
    auth: authReducer,
  },
});

export default store;
