import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useState } from 'react'

const category = 'crypto'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [inputMorse, setInputMorse] = useState('')
  const [outputText, setOutputText] = useState('')
  const [outputMorse, setOutputMorse] = useState('')

  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const morseCode = {
    A: '.-',
    B: '-...',
    C: '-.-.',
    D: '-..',
    E: '.',
    F: '..-.',
    G: '--.',
    H: '....',
    I: '..',
    J: '.---',
    K: '-.-',
    L: '.-..',
    M: '--',
    N: '-.',
    O: '---',
    P: '.--.',
    Q: '--.-',
    R: '.-.',
    S: '...',
    T: '-',
    U: '..-',
    V: '...-',
    W: '.--',
    X: '-..-',
    Y: '-.--',
    Z: '--..',
    1: '.----',
    2: '..---',
    3: '...--',
    4: '....-',
    5: '.....',
    6: '-....',
    7: '--...',
    8: '---..',
    9: '----.',
    0: '-----',
    '.': '.-.-.-',
    ',': '--..--',
    '?': '..--..',
    "'": '.----.',
    '/': '-..-.',
    '(': '-.--.',
    ')': '-.--.-',
    '&': '.-...',
    ':': '---...',
    ';': '-.-.-.',
    '=': '-...-',
    '+': '.-.-.',
    '-': '-....-',
    _: '..--.-',
    '"': '.-..-.',
    $: '...-..-',
    '!': '-.-.--',
    '@': '.--.-.',
    ' ': '/',
  }

  function textToMorse(text) {
    return text
      .toUpperCase()
      .split('')
      .map((letter) => (morseCode[letter] ? morseCode[letter] : letter))
      .join(' ')
  }

  function morseToText(morse) {
    const invertedMorseCode = Object.entries(morseCode).reduce(
      (acc, [key, value]) => ({ ...acc, [value]: key }),
      {},
    )
    return morse
      .split(' ')
      .map((code) => (invertedMorseCode[code] ? invertedMorseCode[code] : code))
      .join('')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setShowCopySuccess(true)
    setTimeout(() => setShowCopySuccess(false), 2000) // 2초 후에 메시지 숨기기
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <h2>텍스트(영어,숫자,특수기호) → 모스부호</h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows="4"
        placeholder="텍스트 입력..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setOutputMorse(textToMorse(inputText))}
      >
        변환
      </button>
      <div className="mt-4">
        <p>결과:</p>
        <pre className="p-2 border rounded">{outputMorse}</pre>
        <button onClick={() => copyToClipboard(outputMorse)}>복사</button>
      </div>
      <h2>모스부호 → 텍스트(영어,숫자,특수기호)</h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows="4"
        placeholder="모스 부호 입력..."
        value={inputMorse}
        onChange={(e) => setInputMorse(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setOutputText(morseToText(inputMorse))}
      >
        변환
      </button>
      <div className="mt-4">
        <p>결과:</p>
        <pre className="p-2 border rounded">{outputText}</pre>
        <button onClick={() => copyToClipboard(outputText)}>복사</button>
      </div>
      {showCopySuccess && <div>클립보드에 복사되었습니다!</div>}
      <CustomContent category={category} />
    </>
  )
}
