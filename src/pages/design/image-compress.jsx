import { useState } from 'react'
import imageCompression from 'browser-image-compression'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Input } from '@/components/ui/input'

const category = 'design'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState('')
  const [compressedImage, setCompressedImage] = useState('')
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [isLoading, setIsLoading] = useState(false) // 로딩 상태 추가

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) {
      return
    }

    setIsLoading(true) // 압축 시작 시 로딩 상태 설정
    setOriginalSize(file.size / 1024 / 1024) // 원본 파일 크기 (MB 단위로 변환)

    const options = {
      maxSizeMB: 1, // 최대 파일 크기 (MB)
      maxWidthOrHeight: 1920, // 최대 이미지 크기 (px)
      useWebWorker: true, // 웹 워커 사용 여부
    }

    try {
      const compressedFile = await imageCompression(file, options)
      setCompressedSize(compressedFile.size / 1024 / 1024) // 압축된 파일 크기 (MB 단위로 변환)

      const compressedFileURL = URL.createObjectURL(compressedFile)
      setOriginalImage(URL.createObjectURL(file)) // 원본 이미지 URL 저장
      setCompressedImage(compressedFileURL) // 압축 이미지 URL 저장
    } catch (error) {
      console.error('압축 중 에러 발생:', error)
    } finally {
      setIsLoading(false) // 압축 완료 시 로딩 상태 해제
    }
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container xl:pt-24">
        <h2 className="pb-4">Image Compress(이미지 압축 도구)</h2>
        {/* <input
          type="file"
          accept="image/*"
          className="block w-full cursor-pointer text-sm
                     text-gray-500 file:mr-4 file:rounded-full
                     file:border-0 file:bg-violet-50
                     file:px-4 file:py-2
                     file:text-sm file:font-semibold
                     file:text-violet-700
                     hover:file:bg-violet-100"
          onChange={handleImageUpload}
        /> */}
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {isLoading && <div>Loading...</div>}
        <div>
          {compressedImage && (
            <>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                Original (원본 이미지 크기): {originalSize.toFixed(2)} MB
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                Compressed (압축된 이미지 크기): {compressedSize.toFixed(2)} MB
              </p>
              <a
                href={compressedImage}
                download="compressed_image.jpg"
                className="mt-2 inline-block rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-blue-300"
              >
                압축 이미지 다운로드
              </a>
              <div className="my-4">
                <img
                  src={compressedImage}
                  alt="Compressed"
                  className="h-auto max-w-[250px] rounded shadow-lg"
                />
              </div>
            </>
          )}
        </div>
      </div>
      <CustomContent category={category} />
    </>
  )
}

export default ImageCompressor
