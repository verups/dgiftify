import enMessages from './messages/en';
import esMessages from './messages/es';

const messages = {
  es: esMessages,
  en: enMessages
};

export const getMessages = currentIntl => messages[currentIntl] || enMessages;
