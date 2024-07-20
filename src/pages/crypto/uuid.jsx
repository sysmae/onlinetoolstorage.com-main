import { useState } from 'react'
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
        <h2 className="text-2xl font-bold mb-4">UUID Generator</h2>
        <div className="mb-4">
          <select
            className="form-select block w-full mt-1"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          >
            <option value="v4">v4 (Random)</option>
            <option value="v1">v1 (Time Based)</option>
          </select>
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
          onClick={generateUuid}
        >
          Generate
        </button>
        {uuid && (
          <div className="mt-4 flex justify-between items-center">
            <span className="font-mono">{uuid}</span>
            <button
              className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
              onClick={() => copyToClipboard(uuid)}
            >
              Copy
            </button>
          </div>
        )}
        {showCopySuccess && (
          <div className="mt-4 text-sm text-green-700 bg-green-200 p-2 rounded">
            Copied!
          </div>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}
