import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export default i18n
  .use(Backend)
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    lng:
      window.localStorage.getItem('lang') ??
      (window.navigator.language || 'en'),
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });
