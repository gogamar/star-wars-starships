export const handleFirebaseError = (error) => {
  switch (error.code) {
    case "auth/invalid-credential":
      return "Either your username or your password are not correct. Please try again.";
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in or use a different email to sign up a new user.";
    case "auth/user-not-found":
      return "No user found with this email address. Please sign up or check the email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection and try again.";
    default:
      return "An unexpected error occurred. Please try again later.";
  }
};
