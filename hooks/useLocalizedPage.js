// hooks/useLocalizedPage.js
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

function useLocalizedPage(namespace) {
  const router = useRouter()
  const { locale, pathname, asPath } = router
  const pageKey = pathname.split('/').pop()
  const { t } = useTranslation(namespace)

  const seoData = {
    title: t(`${pageKey}.title`),
    description: t(`${pageKey}.description`),
    url: `https://www.onlinetoolstorage.com/${locale}${asPath}`,
  }

  return { t, seoData, pageKey }
}

export default useLocalizedPage
