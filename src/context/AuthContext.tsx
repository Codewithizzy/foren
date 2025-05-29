import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  isAuthenticated: false
});

export const useAuth = () => useContext(AuthContext);

// Mock user database for development
let MOCK_USERS_DB: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'admin@foren.com',
    role: 'admin',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'officer@foren.com',
    role: 'forensic_officer',
    profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'investigator@foren.com',
    role: 'investigator',
    profileImage: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

// Password for all mock accounts
const MOCK_PASSWORD = 'password';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved authentication in localStorage
    const savedUser = localStorage.getItem('foren_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    setLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS_DB.find(u => u.email === email);
        if (foundUser && password === MOCK_PASSWORD) {
          setUser(foundUser);
          localStorage.setItem('foren_user', JSON.stringify(foundUser));
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        if (MOCK_USERS_DB.some(u => u.email === email)) {
          setLoading(false);
          reject(new Error('Email already in use'));
          return;
        }

        // Create new user (default role is investigator)
        const newUser: User = {
          id: (MOCK_USERS_DB.length + 1).toString(),
          name,
          email,
          role: 'investigator', // Default role for new users
          profileImage: `https://i.pravatar.cc/150?u=${email}` // Generate avatar based on email
        };

        // Add to mock database and "login" the user
        MOCK_USERS_DB = [...MOCK_USERS_DB, newUser];
        setUser(newUser);
        localStorage.setItem('foren_user', JSON.stringify(newUser));
        setLoading(false);
        resolve();
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foren_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup,
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};