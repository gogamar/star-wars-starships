import { configureStore } from "@reduxjs/toolkit";
import starshipsReducer from "./starshipsListSlice";
import starshipDetailsReducer from "./starshipDetailsSlice";
import usersReducer from "./usersSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    starships: starshipsReducer,
    starshipDetails: starshipDetailsReducer,
    users: usersReducer,
    auth: authReducer,
  },
});

export default store;
