// next-i18next.config.js
// const path = require('path')

module.exports = {
  i18n: {
    locales: ['default', 'en', 'ko'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  trailingSlash: true,

  // localePath: path.resolve('./public/locales'),

  reloadOnPrerender: process.env.NODE_ENV === 'development',
  // interpolation: {
  //   escapeValue: false, // not needed for react as it escapes by default
  //   formatSeparator: ',',
  // },
}
