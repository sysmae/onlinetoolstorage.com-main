// next-i18next.config.js
const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['en', 'ko'],
  },
  localePath: path.resolve('./public/locales'),
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
    formatSeparator: ',',
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
