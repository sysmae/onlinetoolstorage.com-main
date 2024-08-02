import React, { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'business'

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
  const [keywords, setKeywords] = useState([])

  const extractKeywords = (inputText) => {
    const words = inputText.split(/\s+/) // 공백을 기준으로 단어 분리
    const frequency = words.reduce((acc, word) => {
      word = word.trim() // 앞뒤 공백 제거
      if (word) {
        // 빈 문자열이 아닐 경우에만 계산
        acc[word] = acc[word] ? acc[word] + 1 : 1
      }
      return acc
    }, {})

    let sortedKeywords = Object.entries(frequency).sort((a, b) => b[1] - a[1])
    // 10위 키워드의 등장 횟수 가져오기
    const tenthFrequency = sortedKeywords[9] ? sortedKeywords[9][1] : null
    if (tenthFrequency) {
      sortedKeywords = sortedKeywords.filter(
        ([word, count]) => count >= tenthFrequency,
      )
    }
    setKeywords(sortedKeywords)
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto p-4">
        <h2 className="mb-4 text-xl font-bold">Keyword Extractor</h2>
        <textarea
          className="mb-4 w-full rounded border border-gray-300 p-2"
          rows="6"
          placeholder="Type or paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => extractKeywords(text)}
        >
          Extract Keywords
        </button>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Extracted Keywords:</h2>
          <ul>
            {keywords.map(([keyword, count], index) => (
              <li key={index}>
                {keyword} - {count} times
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CustomContent category={category} />
    </>
  )
}
