import React, { useState } from 'react';
import './ForgottenPassword.css';
const ForgottenPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Reset error message if valid email
    setError('');

    // Simulating password reset request
    // In a real application, you'd call an API to handle the password reset
    setTimeout(() => {
      setSuccess(true);
      setEmail('');
    }, 2000);
  };

  return (
    <div className="forgotten-password-container">
      <h2>Forgot Your Password?</h2>
      {success ? (
        <div className="success-message">
          <p>Password reset link sent! Please check your email.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Send Password Reset Link</button>
        </form>
      )}
    </div>
  );
};

export default ForgottenPassword;
