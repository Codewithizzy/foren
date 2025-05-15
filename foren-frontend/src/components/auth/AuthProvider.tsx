import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: any;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const login = async (credentials: { email: string; password: string }) => {
    // In a real app, this would be an API call
    const mockUser = {
      id: '1',
      email: credentials.email,
      name: 'Forensic Analyst',
      role: 'analyst',
      token: 'mock-token',
    };
    setUser(mockUser);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}