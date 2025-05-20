import { createContext, useContext } from 'react';

const AuthContext = createContext({
  loggedUser: null,
  login: () => {},
  register: () => {},
  logout: () => {}
});

export default AuthContext;

export const useKioskAuth = () => useContext(AuthContext);
