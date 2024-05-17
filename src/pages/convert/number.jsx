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
  const [inputNumber, setInputNumber] = useState('')
  const [fromBase, setFromBase] = useState(10)
  const [toBase, setToBase] = useState(2)
  const [convertedNumber, setConvertedNumber] = useState('')
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  function convertNumber(inputNumber, fromBase, toBase) {
    if (isNaN(parseInt(inputNumber, fromBase))) {
      return 'Invalid Number(유효한 숫자를 입력하세요.)'
    }
    const number = parseInt(inputNumber, fromBase) // 입력을 원본 진법으로 파싱
    return number.toString(toBase) // 대상 진법으로 변환
  }

  const handleConvert = () => {
    const result = convertNumber(inputNumber, fromBase, toBase)
    setConvertedNumber(result)
  }

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
        <h2 className="text-xl font-bold mb-4">Base Converter (진법 변환기)</h2>
        <input
          className="w-full p-2 border rounded mb-4"
          type="text"
          placeholder={`Enter ${fromBase} base number... (${fromBase}진수 입력...)`}
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
        />
        <div className="flex gap-2 mb-4">
          <div>
            <label>Original Base (원본 진법): </label>
            <select
              className="p-2 border rounded"
              value={fromBase}
              onChange={(e) => setFromBase(parseInt(e.target.value, 10))}
            >
              <option value={2}>Binary (2진수)</option>
              <option value={8}>Octal (8진수)</option>
              <option value={10}>Decimal (10진수)</option>
              <option value={16}>Hexadecimal (16진수)</option>
            </select>
          </div>
          <div>
            <label>Target Base (대상 진법): </label>
            <select
              className="p-2 border rounded"
              value={toBase}
              onChange={(e) => setToBase(parseInt(e.target.value, 10))}
            >
              <option value={2}>Binary (2진수)</option>
              <option value={8}>Octal (8진수)</option>
              <option value={10}>Decimal (10진수)</option>
              <option value={16}>Hexadecimal (16진수)</option>
            </select>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleConvert}
        >
          Convert (변환)
        </button>
        {convertedNumber && (
          <div className="mt-4">
            <p>Conversion Result (변환 결과): {convertedNumber}</p>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => copyToClipboard(convertedNumber)}
            >
              Copy (복사)
            </button>
          </div>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}
