import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import UnitConverter from '@/components/UnitConverter'

const category = 'units'
const units = [
  'mm3',
  'cm3',
  'ml',
  'l',
  'kl',
  'm3',
  'km3',
  'tsp',
  'Tbs',
  'in3',
  'fl-oz',
  'cup',
  'pnt',
  'qt',
  'gal',
  'ft3',
  'yd3',
]

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
