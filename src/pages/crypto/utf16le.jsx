import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CryptoJS from 'crypto-js'
import Decoder from '@/components/crypto/Decoder'
import Encoder from '@/components/crypto/Encoder'

const category = 'crypto'

//utf16le
const encode = (input) => {
  return CryptoJS.enc.Utf16LE.parse(input).toString(CryptoJS.enc.Utf16LE)
}

const decode = (input) => {
  return CryptoJS.enc.Utf16LE.parse(input).toString(CryptoJS.enc.Utf16LE)
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function UTF16LE() {
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
