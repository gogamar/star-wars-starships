import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./AuthProvider";

import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
