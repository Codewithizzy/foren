import { useState } from "react";
import EmailLoginForm from "./EmailLoginForm"; // Import the EmailLoginForm component

const AuthPage = () => {
  const [userId, setUserId] = useState<string | null>(null); // Track user state

  // This function is triggered on successful login
  const handleLoginSuccess = (userId: string) => {
    setUserId(userId); // Store the user ID
    console.log("Login successful! User ID:", userId); // Perform actions on success (like redirecting)
  };

  return (
    <div>
      {!userId ? (
        <EmailLoginForm onSuccess={handleLoginSuccess} />
      ) : (
        <div>Welcome, user {userId}!</div> // Show user info after login
      )}
    </div>
  );
};

export default AuthPage;
