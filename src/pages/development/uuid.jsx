import { useState } from 'react'
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'development'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [version, setVersion] = useState('v4') // 기본으로 v4를 사용
  const [uuid, setUuid] = useState('')
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const generateUuid = () => {
    setUuid(version === 'v4' ? uuidv4() : uuidv1())
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowCopySuccess(true) // 복사 성공 시 알림 표시
      setTimeout(() => setShowCopySuccess(false), 2000) // 2초 후 알림 숨김
    })
  }
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="mx-auto my-8 p-4">
        <h2 className="mb-4 text-2xl font-bold">UUID Generator</h2>
        <div className="mb-4 flex gap-2">
          <select
            className="form-select mt-1 block w-full dark:text-gray-700"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          >
            <option value="v4">v4 (Random)</option>
            <option value="v1">v1 (Time Based)</option>
          </select>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
            onClick={generateUuid}
          >
            Generate
          </button>
        </div>

        {uuid && (
          <div className="mt-4 flex items-center justify-between">
            <span className="font-mono">{uuid}</span>
            <button
              className="ml-4 rounded bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-700"
              onClick={() => copyToClipboard(uuid)}
            >
              Copy
            </button>
          </div>
        )}
        {showCopySuccess && (
          <div className="mt-4 rounded bg-green-200 p-2 text-sm text-green-700">
            Copied!
          </div>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}
