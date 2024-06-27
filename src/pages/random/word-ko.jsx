import React, { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'random'

const consonants = [
  'ㄱ',
  'ㄴ',
  'ㄷ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅅ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
]
const vowels = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ']

function selectRandom(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function combineSyllable() {
  const consonant = selectRandom(consonants)
  const vowel = selectRandom(vowels)
  // 한글 음절 조합 공식
  const syllable =
    44032 + consonants.indexOf(consonant) * 588 + vowels.indexOf(vowel) * 28
  return String.fromCharCode(syllable)
}

function generateKoreanWord(length) {
  let word = ''
  for (let i = 0; i < length; i++) {
    word += combineSyllable()
  }
  return word
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function Home() {
  const [length, setLength] = useState(3) // 기본 단어 길이
  const [count, setCount] = useState(1) // 생성할 단어의 수
  const [words, setWords] = useState([])

  const handleGenerate = () => {
    const generatedWords = Array.from({ length: count }, () =>
      generateKoreanWord(length),
    )
    setWords(generatedWords)
  }
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">랜덤 한글 단어 생성</h2>
        <div className="mb-4">
          <label className="block">
            단어 길이:
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value, 10) || 1)}
              className="border rounded-md px-2 py-1 mt-1 mb-2"
            />
          </label>
          <label className="block">
            생성할 단어 수:
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)}
              className="border rounded-md px-2 py-1 mt-1 mb-2"
            />
          </label>
        </div>
        <button
          onClick={handleGenerate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          생성하기
        </button>
        <ul className="flex flex-wrap mt-4">
          {words.map((word, index) => (
            <li key={index} className="mr-2 mb-2 whitespace-nowrap">
              {word}
            </li>
          ))}
        </ul>
      </div>

      <CustomContent category={category} />
    </>
  )
}
