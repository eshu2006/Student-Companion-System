import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const userToStore = {
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role
    };
    
    localStorage.setItem('user', JSON.stringify(userToStore));
    setUser(userToStore);
    return userToStore;
  };

  const signup = async (name, email, password) => {
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser = {
      email,
      password,
      name,
      role: 'user'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const userToStore = {
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    };
    
    localStorage.setItem('user', JSON.stringify(userToStore));
    setUser(userToStore);
    return userToStore;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    signup,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}



