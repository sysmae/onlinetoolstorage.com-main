import React, { useState, useEffect } from 'react'

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
  const [selectedImage, setSelectedImage] = useState(null)
  const [watermarkText, setWatermarkText] = useState('Watermark')
  const [processedImage, setProcessedImage] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && selectedImage) {
      // Ensure watermarkjs is only imported client-side
      const watermark = require('watermarkjs')

      watermark([selectedImage])
        .image(
          watermark.text.lowerRight(
            watermarkText,
            '48px Josefin Slab',
            '#fff',
            0.5,
          ),
        )
        .then((img) => {
          setProcessedImage(img.src)
        })
    }
  }, [selectedImage, watermarkText])

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => setSelectedImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const applyWatermark = () => {
    if (typeof window !== 'undefined' && selectedImage) {
      // Dynamically import watermarkjs on the client side
      const watermark = require('watermarkjs')

      watermark([selectedImage])
        .image(
          watermark.text.lowerRight(
            watermarkText,
            '48px Josefin Slab',
            '#fff',
            0.5,
          ),
        )
        .then((img) => {
          setProcessedImage(img.src)
        })
    }
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div>
        <h2>Image Watermarker</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Enter watermark text"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
        />
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              // Check if running on client side
              applyWatermark()
            }
          }}
        >
          Apply Watermark
        </button>
        {processedImage && (
          <div>
            <h2>Watermarked Image</h2>
            <a href={processedImage} download="watermarked-image.png">
              Download Image
            </a>
            <img
              src={processedImage}
              alt="Watermarked"
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
