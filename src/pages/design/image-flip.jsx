import React, { useState, useRef, useEffect } from 'react'
import 'react-image-crop/dist/ReactCrop.css'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const category = 'design'

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
  const imgRef = useRef(null)
  const canvasRef = useRef(null)
  const [downloadUrl, setDownloadUrl] = useState('')
  const [horizontalFlip, setHorizontalFlip] = useState(false)
  const [verticalFlip, setVerticalFlip] = useState(false)

  useEffect(() => {
    if (imgSrc) {
      applyTransform()
    }
  }, [horizontalFlip, verticalFlip, imgSrc])

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function flipImageHorizontal() {
    setHorizontalFlip(!horizontalFlip)
  }

  function flipImageVertical() {
    setVerticalFlip(!verticalFlip)
  }

  function applyTransform() {
    if (!imgRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const image = imgRef.current

    // Setting canvas size to image size
    canvas.width = image.width
    canvas.height = image.height

    // Reset transformations
    ctx.setTransform(1, 0, 0, 1, 0, 0)

    // Apply flip transformations
    ctx.scale(horizontalFlip ? -1 : 1, verticalFlip ? -1 : 1)
    ctx.translate(
      horizontalFlip ? -image.width : 0,
      verticalFlip ? -image.height : 0,
    )

    // Draw the image
    ctx.drawImage(image, 0, 0)

    // Convert canvas to Blob
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        setDownloadUrl(url)
      }
    }, 'image/png')
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="App">
        <div className="Crop-Controls flex xl:mt-24">
          <Input type="file" accept="image/*" onChange={onSelectFile} />
          <Button onClick={flipImageHorizontal}>Flip Horizontal</Button>
          <Button onClick={flipImageVertical}>Flip Vertical</Button>
        </div>

        {imgSrc && (
          <div style={{ margin: '20px' }}>
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Crop preview"
              style={{ maxWidth: '100%', display: 'none' }}
            />
            <canvas ref={canvasRef} style={{ maxWidth: '100%' }} />
            {downloadUrl && (
              <Button asChild>
                <a href={downloadUrl} download="flipped-image.png">
                  Download Flipped Image
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}

export default Home
