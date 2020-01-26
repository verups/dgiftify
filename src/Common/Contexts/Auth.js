import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const initialState = {
  authToken: 'fdd',
  isAuthenticated: true,
  userName: 'Aia'
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        authToken: payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...state,
        authToken: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
