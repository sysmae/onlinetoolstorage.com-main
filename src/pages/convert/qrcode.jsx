import React, { useState } from 'react'
import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'convert'

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
  const [qrCode, setQrCode] = useState('')
  const [isLoading, setIsLoading] = useState(false) // 로딩 상태 추가
  const generateQRCode = async () => {
    setIsLoading(true) // QR 코드 생성 시작
    const response = await fetch(`/api/qrcode?text=${encodeURIComponent(text)}`)
    const data = await response.json()
    setTimeout(() => {
      setQrCode(data.qrCodeDataUrl)
      setIsLoading(false) // 1.5초 후 QR 코드 생성 완료
    }, 1500)
  }
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter text to generate QR code"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={generateQRCode}
            disabled={isLoading}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition duration-300"
          >
            QR Code Generate
          </button>
        </div>
        <div
          className="h-8 bg-slate-300 rounded-md flex items-center justify-center text-white font-semibold text-sm mt-4"
          style={{ minHeight: '200px' }}
        >
          {isLoading && <p>QR Code Generating...</p>}
          {qrCode && (
            <>
              <img src={qrCode} alt="Generated QR Code" />
              <button
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = qrCode
                  link.download = 'QRCode.png' // 다운로드할 파일명 지정
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                Download QR Code
              </button>
            </>
          )}
        </div>
      </div>
      <CustomContent category={category} />
    </>
  )
}
