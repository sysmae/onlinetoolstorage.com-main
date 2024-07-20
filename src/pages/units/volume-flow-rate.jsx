import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import UnitConverter from '@/components/UnitConverter'

const category = 'units'
const units = [
  'mm3/s',
  'cm3/s',
  'ml/s',
  'cl/s',
  'dl/s',
  'l/s',
  'l/min',
  'l/h',
  'kl/s',
  'kl/min',
  'kl/h',
  'm3/s',
  'm3/min',
  'm3/h',
  'km3/s',
  'tsp/s',
  'Tbs/s',
  'in3/s',
  'in3/min',
  'in3/h',
  'fl-oz/s',
  'fl-oz/min',
  'fl-oz/h',
  'cup/s',
  'pnt/s',
  'pnt/min',
  'pnt/h',
  'qt/s',
  'gal/s',
  'gal/min',
  'gal/h',
  'ft3/s',
  'ft3/min',
  'ft3/h',
  'yd3/s',
  'yd3/min',
  'yd3/h',
]
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
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
