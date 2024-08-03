import React, { useState, useEffect, useRef } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'design'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

const Home = () => {
  const [imgSrc, setImgSrc] = useState('')
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 })
  const [resizedSize, setResizedSize] = useState({ width: 0, height: 0 })
  const [width, setWidth] = useState(100) // Default width to avoid zero size canvas
  const [height, setHeight] = useState(100) // Default height to avoid zero size canvas
  const imgRef = useRef(null)
  const canvasRef = useRef(null)
  const [downloadUrl, setDownloadUrl] = useState('')

  useEffect(() => {
    if (imgRef.current) {
      setOriginalSize({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight,
      })
      // Initialize with natural dimensions
      setWidth(imgRef.current.naturalWidth)
      setHeight(imgRef.current.naturalHeight)
    }
  }, [imgSrc])

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function resizeImage() {
    if (!imgRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const image = imgRef.current

    canvas.width = width
    canvas.height = height

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, width, height)

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
      setResizedSize({ width, height }) // Update resized size state
    }, 'image/png')

    const resizedImageSrc = canvas.toDataURL('image/png')
    setImgSrc(resizedImageSrc)
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="App xl:mt-24">
        <Input type="file" accept="image/*" onChange={onSelectFile} />
        <div>
          <label>
            Original Size: {originalSize.width} x {originalSize.height}
          </label>
          <br />
          <label>
            Resized Size: {resizedSize.width} x {resizedSize.height}
          </label>
        </div>
        <div>
          <div className="flex items-center py-2">
            <label>Width:</label>
            <Input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="flex items-center py-2">
            <label>Height:</label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
        <Button onClick={resizeImage}>Resize Image</Button>
        {downloadUrl && (
          <Button asChild>
            <a href={downloadUrl} download="resized-image.png">
              Download Resized Image
            </a>
          </Button>
        )}
        {imgSrc && (
          <div style={{ margin: '20px' }}>
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Resized Image"
              style={{ maxWidth: '100%' }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}

export default Home
