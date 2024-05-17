import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Decoder from '@/components/crypto/Decoder'
import Encoder from '@/components/crypto/Encoder'

const decode = (ascii) => {
  return ascii
    .split(',')
    .map((code) => String.fromCharCode(parseInt(code)))
    .join('')
}

const encode = (input) => {
  return input
    .split('')
    .map((char) => char.charCodeAt(0))
    .join(', ')
}

const category = 'crypto'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function Ascii() {
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <Encoder encode={encode} />
      <Decoder decode={decode} />
      <CustomContent category={category} />
    </>
  )
}
