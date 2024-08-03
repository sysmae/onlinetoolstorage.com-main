import { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Textarea } from '@/components/ui/textarea'

const category = 'general'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [text, setText] = useState('')

  // 공백 포함 글자수 계산
  const characterCountWithSpaces = text.length

  // 공백을 제외한 글자수 계산
  const characterCountWithoutSpaces = text.replace(/\s+/g, '').length

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto px-4 py-8">
        <Textarea
          rows="10"
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></Textarea>
        <div className="mt-4">
          <p className="mb-2">
            Character count with spaces(공백 포함 글자수):
            {characterCountWithSpaces}
          </p>
          <p>
            Character count without spaces(공백 없는 글자수):
            {characterCountWithoutSpaces}
          </p>
        </div>
      </div>

      <CustomContent category={category} />
    </>
  )
}
