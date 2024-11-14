import { configureStore } from "@reduxjs/toolkit";
import starshipsReducer from "./starshipSlice";

const store = configureStore({
  reducer: {
    starships: starshipsReducer,
  },
});

export default store;
