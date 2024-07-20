import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CryptoJS from 'crypto-js'
import Decoder from '@/components/crypto/DecoderWithKey'
import Encoder from '@/components/crypto/EncoderWithKey'

const category = 'crypto'

const decode = (input, key, iv) => {
  return CryptoJS.DES.decrypt(input, key, { iv: iv }).toString(
    CryptoJS.enc.Utf8,
  )
}

const encode = (input, key, iv) => {
  return CryptoJS.DES.encrypt(input, key, { iv: iv }).toString()
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function DES() {
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
