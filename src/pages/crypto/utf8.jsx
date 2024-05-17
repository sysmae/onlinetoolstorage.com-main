import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CryptoJS from 'crypto-js'
import Decoder from '@/components/crypto/Decoder'
import Encoder from '@/components/crypto/Encoder'

const category = 'crypto'

//utf8
const encode = (input) => {
  return CryptoJS.enc.Utf8.parse(input).toString(CryptoJS.enc.Hex)
}

const decode = (hexInput) => {
  return CryptoJS.enc.Hex.parse(hexInput).toString(CryptoJS.enc.Utf8)
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function UTF8() {
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
