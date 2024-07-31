const { i18n } = require('./next.config')

module.exports = {
  siteUrl: 'https://www.onlinetoolstorage.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  // generateIndexSitemap: false, // 인덱스 사이트맵 생성을 비활성화 (선택 사항)

  alternateRefs: i18n.locales.map((locale) => ({
    href: `https://www.onlinetoolstorage.com/${locale}`,
    hreflang: locale,
  })),

  transform: async (config, path) => {
    // // Filter out paths that contain '/ko'
    if (path.includes('/ko')) {
      return null
    }

    if (path.includes('/en')) {
      return null
    }

    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: config.changefreq,
      priority: config.priority,
      alternateRefs: i18n.locales.map((locale) => ({
        href: `https://www.onlinetoolstorage.com/${locale}`,

        hreflang: locale,
      })),
    }
  },
}
