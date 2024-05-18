module.exports = {
  siteUrl: 'https://www.onlinetoolstorage.com',
  generateRobotsTxt: true,
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
  // transform: async (config, path) => {
  //   // 기본 경로와 언어별 경로를 모두 포함하여 사이트맵 생성
  //   const paths = config.i18n.locales.map((locale) => ({
  //     loc: `${config.siteUrl}${locale === config.i18n.defaultLocale ? '' : `/${locale}`}${path}`,
  //     alternateRefs: config.i18n.locales.map((altLocale) => ({
  //       href: `${config.siteUrl}${altLocale === config.i18n.defaultLocale ? '' : `/${altLocale}`}${path}`,
  //       hreflang: altLocale,
  //     })),
  //     changefreq: 'daily',
  //     priority: 0.7,
  //     lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  //   }))

  //   return paths
  // },
}
