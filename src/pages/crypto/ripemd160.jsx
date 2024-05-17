import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CryptoJS from 'crypto-js'
import Encoder from '@/components/crypto/Encoder'

const category = 'crypto'

//ripemd160
const encode = (input) => {
  return CryptoJS.RIPEMD160(input).toString()
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function RipeMD160() {
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <Encoder encode={encode} />
      <CustomContent category={category} />
    </>
  )
}
