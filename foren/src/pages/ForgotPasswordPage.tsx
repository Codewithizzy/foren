import React from 'react';

const ForgotPasswordPage: React.FC = () => {
  return (
    <div>
      <h2>Forgot Password</h2>
      <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
