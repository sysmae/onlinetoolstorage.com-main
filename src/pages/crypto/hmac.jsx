import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CryptoJS from 'crypto-js'
import Encoder from '@/components/crypto/EncoderWithKey'

const category = 'crypto'

const hmacSHA256Encode = (input, key) => {
  return CryptoJS.HmacSHA256(input, key).toString()
}

const hmacSHA512Encode = (input, key) => {
  return CryptoJS.HmacSHA512(input, key).toString()
}

const hmacSHA1Encode = (input, key) => {
  return CryptoJS.HmacSHA1(input, key).toString()
}

const hmacSHA384Encode = (input, key) => {
  return CryptoJS.HmacSHA384(input, key).toString()
}

const hmacSHA3Encode = (input, key) => {
  return CryptoJS.HmacSHA3(input, key).toString()
}

const hmacRIPEMD160Encode = (input, key) => {
  return CryptoJS.HmacRIPEMD160(input, key).toString()
}

const hmacMD5Encode = (input, key) => {
  return CryptoJS.HmacMD5(input, key).toString()
}

const hmacSHA224Encode = (input, key) => {
  return CryptoJS.HmacSHA224(input, key).toString()
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function HMAC() {
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <h3 className="text-xl font-semibold my-4">HmacSHA512</h3>
      <Encoder encode={hmacSHA512Encode} />

      <h3 className="text-xl font-semibold my-4">HmacSHA384</h3>
      <Encoder encode={hmacSHA384Encode} />

      <h3 className="text-xl font-semibold my-4">HmacSHA256</h3>
      <Encoder encode={hmacSHA256Encode} />

      <h3 className="text-xl font-semibold my-4">HmacSHA3</h3>
      <Encoder encode={hmacSHA3Encode} />

      <h3 className="text-xl font-semibold my-4">HmacSHA224</h3>
      <Encoder encode={hmacSHA224Encode} />

      <h3 className="text-xl font-semibold my-4">HmacSHA1</h3>
      <Encoder encode={hmacSHA1Encode} />

      <h3 className="text-xl font-semibold my-4">HmacRIPEMD160</h3>
      <Encoder encode={hmacRIPEMD160Encode} />

      <h3 className="text-xl font-semibold my-4">HmacMD5</h3>
      <Encoder encode={hmacMD5Encode} />
      <CustomContent category={category} />
    </>
  )
}
