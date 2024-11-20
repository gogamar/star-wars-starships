import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, logout, checkingComplete } from "./redux/authSlice";
import { auth } from "./firebaseConfig";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
          })
        );
      } else {
        dispatch(logout());
      }
      dispatch(checkingComplete());
    });

    // Clean up on component unmount
    return () => unsubscribe();
  }, [dispatch]);

  return children;
};

export default AuthProvider;
