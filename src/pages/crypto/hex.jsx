import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Decoder from '@/components/crypto/Decoder'
import Encoder from '@/components/crypto/Encoder'

const decode = (hex) => {
  return hex
    .split(' ')
    .map((code) => String.fromCharCode(parseInt(code, 16)))
    .join('')
}

const encode = (input) => {
  return input
    .split('')
    .map((char) => char.charCodeAt(0).toString(16))
    .join(' ')
}

const category = 'crypto'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Hex() {
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
