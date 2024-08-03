import React, { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [length, setLength] = useState(3) // 기본 단어 길이
  const [count, setCount] = useState(1) // 생성할 단어의 수
  const [words, setWords] = useState([])
  const [toast, setToast] = useState('') // Toast 상태 관리

  const handleGenerate = () => {
    const generatedWords = Array.from({ length: count }, () =>
      generateKoreanWord(length),
    )
    setWords(generatedWords)
  }

  const handleCopy = (word) => {
    navigator.clipboard.writeText(word)
    setToast(`${word} copied to clipboard!`)
    setTimeout(() => setToast(''), 3000) // Toast 메시지 자동 사라짐
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto max-w-lg px-4 py-8">
        <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
          랜덤 한글 단어 생성
        </h3>
        <div className="mb-6 space-y-4">
          <label className="block text-gray-700 dark:text-gray-300">
            단어 길이:
            <Input
              type="number"
              value={length}
              onChange={(e) =>
                setLength(Math.max(parseInt(e.target.value, 10) || 1, 1))
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            />
          </label>
          <label className="block text-gray-700 dark:text-gray-300">
            생성할 단어 수:
            <Input
              type="number"
              value={count}
              onChange={(e) =>
                setCount(Math.max(parseInt(e.target.value, 10) || 1, 1))
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            />
          </label>
        </div>
        <Button
          onClick={handleGenerate}
          className="w-full rounded-md bg-blue-500 px-4 py-2 font-bold text-white transition duration-200 ease-in-out hover:bg-blue-600"
        >
          생성하기
        </Button>
        <ul className="mt-6 flex flex-wrap gap-4">
          {words.map((word, index) => (
            <li
              key={index}
              className="flex h-12 min-w-[150px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-gray-200 text-center text-xl font-bold text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              onClick={() => handleCopy(word)}
            >
              <span className="truncate">{word}</span>
            </li>
          ))}
        </ul>
        {toast && (
          <div className="fixed bottom-4 right-4 rounded-md bg-green-500 p-3 text-white shadow-lg">
            {toast}
          </div>
        )}
      </div>

      <CustomContent category={category} />
    </>
  )
}
