import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import Navbar from "./Navbar";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {},
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [
      {
        id: 1,
        first_name: "Luke",
        email: "luke@rebels.com",
        avatar: "/api/placeholder/100/100",
      },
    ],
  },
  reducers: {},
});

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      users: usersSlice.reducer,
    },
    preloadedState: initialState,
  });
};

const StoryWrapper = ({ children, initialState }) => {
  const store = createTestStore(initialState);
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  decorators: [
    (Story, context) => (
      <StoryWrapper initialState={context.args.initialState}>
        <Story />
      </StoryWrapper>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const LoggedOut = {
  args: {
    initialState: {
      auth: {
        user: null,
      },
      users: {
        users: [],
      },
    },
  },
};

export const LoggedIn = {
  args: {
    initialState: {
      auth: {
        user: {
          id: 1,
          first_name: "Luke",
          email: "luke@rebels.com",
          avatar: "/api/placeholder/100/100",
        },
      },
      users: {
        users: [
          {
            id: 1,
            first_name: "Luke",
            email: "luke@rebels.com",
            avatar: "/api/placeholder/100/100",
          },
        ],
      },
    },
  },
};
