// hooks/useLocalizedPage.js
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

function useLocalizedPage(namespace) {
  const router = useRouter()
  let { locale, pathname, asPath } = router

  // 각 카테고리 index 페이지의 경우 경로를 /index로 변경
  if (
    pathname === '/' ||
    pathname === '/business' ||
    pathname === '/crypto' ||
    pathname === '/design' ||
    pathname === '/development' ||
    pathname === '/finance' ||
    pathname === '/general' ||
    pathname === '/math-sciences' ||
    pathname === '/random' ||
    pathname === '/units'
  ) {
    pathname = '/index'
  }
  const pageKey = pathname.split('/').pop()
  const { t } = useTranslation(namespace)
  const formattedAsPath = asPath === '/' ? '' : asPath

  const seoData = {
    title: t(`${pageKey}.title`),
    description: t(`${pageKey}.description`),
    url: `https://www.onlinetoolstorage.com/${locale}${formattedAsPath}`,
  }

  return { t, seoData, pageKey }
}

export default useLocalizedPage
