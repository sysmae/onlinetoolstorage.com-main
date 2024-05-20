// TODO: 수직 한번 수평 한번 하면 원래대로 돌아오는 버그 수정

import React, { useState, useRef } from 'react'
import 'react-image-crop/dist/ReactCrop.css'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'image'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

const Home = () => {
  const [imgSrc, setImgSrc] = useState('')
  const imgRef = useRef(null)
  const canvasRef = useRef(null)
  const [downloadUrl, setDownloadUrl] = useState('')

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
    if (imgRef.current) {
      imgRef.current.style.transform = `scaleX(${imgRef.current.style.transform.includes('-1') ? '1' : '-1'})`
    }
    applyTransform('horizontal')
  }

  function flipImageVertical() {
    if (imgRef.current) {
      imgRef.current.style.transform = `scaleY(${imgRef.current.style.transform.includes('-1') ? '1' : '-1'})`
    }
    applyTransform('vertical')
  }

  function applyTransform(direction) {
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
    if (direction === 'horizontal') {
      ctx.scale(-1, 1)
      ctx.translate(-image.width, 0)
    } else if (direction === 'vertical') {
      ctx.scale(1, -1)
      ctx.translate(0, -image.height)
    }

    // Draw the image
    ctx.drawImage(image, 0, 0)

    // Convert canvas to Blob
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
    }, 'image/png')
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="App">
        <div className="Crop-Controls">
          <input type="file" accept="image/*" onChange={onSelectFile} />
          <button onClick={flipImageHorizontal}>Flip Horizontal</button>
          <button onClick={flipImageVertical}>Flip Vertical</button>
        </div>
        {downloadUrl && (
          <a href={downloadUrl} download="flipped-image.png">
            Download Flipped Image
          </a>
        )}

        {imgSrc && (
          <div style={{ margin: '20px' }}>
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Crop preview"
              style={{ maxWidth: '100%' }}
            />
          </div>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}

export default Home
