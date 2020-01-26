import React, { createContext, useReducer } from 'react';
import { IntlProvider } from 'react-intl';

import { getMessages } from '../Services';

export const IntlContext = createContext();

const initialState = {
  locale: 'en',
  messages: getMessages('en')
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_LOCALE':
      return {
        ...state,
        locale: payload,
        messages: getMessages(payload)
      };
    default:
      return state;
  }
};

export const AppIntlProvider = ({ children }) => {
  const [{ locale, messages }, dispatch] = useReducer(reducer, initialState);

  return (
    <IntlContext.Provider value={{ locale, messages, dispatch }}>
      <IntlProvider defaultLocale={locale} locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};
