import React, { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'random'

function generateRandomName(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function generateMultipleNames(length, count) {
  const names = []
  for (let i = 0; i < count; i++) {
    names.push(generateRandomName(length))
  }
  return names
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
  const [length, setLength] = useState(5) // 기본 이름 길이는 5로 설정
  const [count, setCount] = useState(1) // 기본으로 생성할 이름의 수는 1로 설정
  const [names, setNames] = useState([])

  const handleGenerate = () => {
    const generatedNames = generateMultipleNames(length, count)
    setNames(generatedNames)
  }
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div>
        <h2>Random English Word Generator</h2>
        <label className="block">
          Length of Words:
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="border rounded-md px-2 py-1 mt-1 mb-4"
          />
        </label>
        <label className="block">
          Number of Words to Generate:
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10))}
            className="border rounded-md px-2 py-1 mt-1 mb-4"
          />
        </label>
        <button
          onClick={handleGenerate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate
        </button>
        <ul className="mt-4">
          {names.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>

      <CustomContent category={category} />
    </>
  )
}
