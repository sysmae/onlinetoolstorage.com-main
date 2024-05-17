import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import UnitConverter from '@/components/UnitConverter'

const category = 'units'
const units = ['mm2', 'cm2', 'm2', 'ha', 'km2', 'in2', 'ft2', 'ac', 'mi2']

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function Home() {
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <UnitConverter units={units} />
      <CustomContent category={category} />
    </>
  )
}
