import AuthContext from '@/context/AuthContext';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

export default function AuthProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(() => {
    const stored = localStorage.getItem('loggedUser');
    return stored ? JSON.parse(stored) : null;
  });

  const getAllUsers = () => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };

  const saveAllUsers = (users) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const register = (username) => {
    const users = getAllUsers();
    const existing = users.find((user) => user.username === username);
    if (existing) {
      throw new Error('Username sudah terdaftar');
    }

    const newUser = {
      username,
      quizProgress: []
    };

    users.push(newUser);
    saveAllUsers(users);
  };

  const login = (username) => {
    const users = getAllUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
      throw new Error('Username tidak ditemukan');
    }

    localStorage.setItem('loggedUser', JSON.stringify(user));
    setLoggedUser(user);
  };

  const logout = useCallback(() => {
    localStorage.removeItem('loggedUser');
    setLoggedUser(null);
  }, []);

  return <AuthContext.Provider value={{ loggedUser, login, logout, register }}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
