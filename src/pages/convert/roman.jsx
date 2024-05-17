import { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'convert'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function Home() {
  const [inputInt, setInputInt] = useState('')
  const [outputRoman, setOutputRoman] = useState('')
  const [inputRoman, setInputRoman] = useState('')
  const [outputInt, setOutputInt] = useState('')
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  function intToRoman(num) {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    const symbols = [
      'M',
      'CM',
      'D',
      'CD',
      'C',
      'XC',
      'L',
      'XL',
      'X',
      'IX',
      'V',
      'IV',
      'I',
    ]

    let roman = ''
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        num -= values[i]
        roman += symbols[i]
      }
    }
    return roman
  }

  // 로마 숫자를 정수로 변환
  function romanToInt(s) {
    const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
    let int = 0

    for (let i = 0; i < s.length; i++) {
      const curr = map[s[i]]
      const next = map[s[i + 1]]

      if (curr < next) {
        int -= curr
      } else {
        int += curr
      }
    }
    return int
  }

  // 결과 복사 함수
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setShowCopySuccess(true)
    setTimeout(() => setShowCopySuccess(false), 2000)
  }
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">
          Roman Number Convert(로마 숫자 변환기)
        </h2>
        <div>
          <input
            className="w-full p-2 border rounded mb-4"
            type="text"
            placeholder="정수 입력..."
            value={inputInt}
            onChange={(e) => setInputInt(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setOutputRoman(intToRoman(parseInt(inputInt)))}
          >
            Integer → Roman Number(정수 → 로마 숫자)
          </button>
          {outputRoman && (
            <div className="mt-4">
              <p>Result(로마 숫자 결과): {outputRoman}</p>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => copyToClipboard(outputRoman)}
              >
                Copy(복사)
              </button>
            </div>
          )}
        </div>
        <div>
          <input
            className="w-full p-2 border rounded mb-4"
            type="text"
            placeholder="로마 숫자 입력..."
            value={inputRoman}
            onChange={(e) => setInputRoman(e.target.value.toUpperCase())}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setOutputInt(romanToInt(inputRoman))}
          >
            Roman Number → Integer(로마 숫자 → 정수)
          </button>
          {outputInt && (
            <div className="mt-4">
              <p>Result(정수 결과): {outputInt}</p>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => copyToClipboard(outputInt)}
              >
                복사
              </button>
            </div>
          )}
        </div>
      </div>
      <CustomContent category={category} />
    </>
  )
}
