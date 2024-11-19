import { configureStore } from "@reduxjs/toolkit";
import starshipsReducer from "./starshipsListSlice";
import starshipDetailsReducer from "./starshipDetailsSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    starships: starshipsReducer,
    starshipDetails: starshipDetailsReducer,
    auth: authReducer,
  },
});

export default store;
