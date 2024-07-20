import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CryptoJS from 'crypto-js'
import Decoder from '@/components/crypto/Decoder'
import Encoder from '@/components/crypto/Encoder'

const category = 'crypto'

//utf16be
const encode = (input) => {
  return CryptoJS.enc.Utf16BE.parse(input).toString(CryptoJS.enc.Utf16BE)
}

const decode = (input) => {
  return CryptoJS.enc.Utf16BE.parse(utf16be).toString(CryptoJS.enc.Utf16BE)
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function UTF16BE() {
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
