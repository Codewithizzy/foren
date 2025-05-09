import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const apiRequest = async (url: string, body: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/auth${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    const data = await apiRequest('/login', credentials);
    localStorage.setItem('token', data.token);
    navigate('/dashboard');
    return data.user;
  };

  const signup = async (credentials: { email: string; password: string }) => {
    const data = await apiRequest('/signup', credentials);
    localStorage.setItem('token', data.token);
    navigate('/verify-email'); // Or wherever you want to send them after signup
    return data.user;
  };

  const forgotPassword = async (email: string) => {
    await apiRequest('/forgot-password', { email });
  };

  const resetPassword = async (token: string, newPassword: string) => {
    await apiRequest('/reset-password', { token, newPassword });
    navigate('/login');
  };

  const socialLogin = (provider: string) => {
    // Implement social login if needed
    console.log('Social login with', provider);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return {
    login,
    signup,
    forgotPassword,
    resetPassword,
    socialLogin,
    logout,
    loading,
    error,
  };
};

export default useAuth;