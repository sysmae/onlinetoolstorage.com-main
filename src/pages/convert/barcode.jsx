import React, { useRef, useState } from 'react'
import JsBarcode from 'jsbarcode'

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
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const barcodeRef = useRef(null)

  const generateBarcode = () => {
    setLoading(true)
    setError('')
    if (input.trim() === '') {
      setError('바코드로 변환할 텍스트를 입력하세요.')
      setLoading(false)
      return
    }

    try {
      JsBarcode(barcodeRef.current, input, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,
        height: 40,
        displayValue: true,
      })
    } catch (error) {
      setError('바코드 생성에 실패했습니다. 영문자와 숫자만 입력 가능합니다.')
    }

    setLoading(false)
  }

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateBarcode()
    }
  }
  const downloadBarcode = () => {
    const svgElement = barcodeRef.current
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svgElement)

    // SVG 데이터를 바탕으로 새로운 이미지 생성
    const img = new Image()
    const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    img.onload = function () {
      // 이미지 로드 완료 후 canvas를 사용해 PNG로 변환
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url) // 사용하지 않는 URL 객체 해제

      // canvas 내용을 이미지로 변환
      canvas.toBlob(function (blob) {
        // Blob을 사용해 실제 파일 다운로드 수행
        const newUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = newUrl
        a.download = 'barcode.png' // 확장자를 .png로 설정
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }, 'image/png') // PNG 형식으로 변환
    }
    img.src = url
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold my-4">Free Barcode Generate</h2>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          className="border-2 border-gray-300 p-2 w-full mb-4"
          placeholder="바코드로 변환할 텍스트를 입력하세요"
        />
        <button
          onClick={generateBarcode}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Generate
        </button>
        <button
          onClick={downloadBarcode}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Download
        </button>
        <div
          className="h-8 bg-slate-300 rounded-md flex items-center justify-center text-white font-semibold text-sm mt-4"
          style={{ minHeight: '200px' }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {error && <p className="text-red-500">{error}</p>}
              <div className="mt-4">
                <svg ref={barcodeRef}></svg>
              </div>
            </>
          )}
        </div>
      </div>
      <CustomContent category={category} />
    </>
  )
}
