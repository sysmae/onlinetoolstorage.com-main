import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CustomSEOContent from '@/components/CustomSEO'
import CustomH1Content from '@/components/CustomH1Content'
import CustomContent from '@/components/CustomMainContent'

const category = 'common'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

const HomePage = () => {
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <CustomContent category={category} />
    </>
  )
}

export default HomePage
