import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "./redux/authSlice";
import { auth } from "./firebaseConfig";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
      dispatch({ type: "auth/checkingComplete" });
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
};

export default AuthProvider;
