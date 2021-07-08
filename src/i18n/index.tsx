import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';

import translationEng from '../../statics/translations/en';
import translationTr from '../../statics/translations/tr';

i18n.use(XHR).init({
  debug: true,
  lng: 'tr',
  fallbackLng: 'tr',

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },

  resources: {
    en: {
      translations: translationEng,
    },
    tr: {
      translations: translationTr,
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

export default i18n;
