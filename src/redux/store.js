import { configureStore } from "@reduxjs/toolkit";
import starshipsReducer from "./starshipSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    starships: starshipsReducer,
    auth: authReducer,
  },
});

export default store;
