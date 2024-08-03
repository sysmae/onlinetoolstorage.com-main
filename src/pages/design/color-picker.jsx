import { useState } from 'react'
import { SketchPicker } from 'react-color'
import ColorThief from 'colorthief'
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

const ImageColorPicker = () => {
  const [image, setImage] = useState('')
  const [colors, setColors] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [selectedColor, setSelectedColor] = useState('#ffffff')

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      setImage(e.target.result)
      const imgElement = document.createElement('img')
      imgElement.src = e.target.result
      imgElement.onload = () => {
        const colorThief = new ColorThief()
        const extractedColors = colorThief.getPalette(imgElement, 8)
        setColors(extractedColors.map((rgb) => `rgb(${rgb.join(',')})`))
      }
    }

    reader.readAsDataURL(file)
  }

  const handleColorChange = (color) => {
    setSelectedColor(color.hex)
  }

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setToastMessage(`Copied to Clipboard`)
          setShowToast(true)
          setTimeout(() => setShowToast(false), 2000)
        })
        .catch((err) => {
          console.error('Clipboard copy failed:', err)
          setToastMessage('Failed to copy emoji.')
          setShowToast(true)
          setTimeout(() => setShowToast(false), 2000)
        })
    } else {
      console.log('Clipboard API is not supported by this browser.')
    }
  }
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="mb-4 text-2xl font-bold xl:pt-32">Image Color Picker</h2>
        <div className="mt-4">
          {/* <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="block w-full cursor-pointer text-sm
                 text-gray-500 file:mr-4 file:rounded-full
                 file:border-0 file:bg-violet-50
                 file:px-4 file:py-2
                 file:text-sm file:font-semibold
                 file:text-violet-700
                 hover:file:bg-violet-100"
            />
          </label> */}
          <Input
            id="picture"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        {image && (
          <>
            <img
              src={image}
              alt="Upload Preview"
              className="mb-4 max-w-[500px]"
            />
            <div className="mb-4 flex flex-wrap items-center justify-start">
              {colors.map((color, index) => (
                <button
                  key={index}
                  style={{ backgroundColor: color }}
                  className="m-2 size-24"
                  onClick={() => handleColorChange({ hex: color })}
                />
              ))}
            </div>
            <div className="mb-4">
              <SketchPicker
                color={selectedColor}
                onChangeComplete={handleColorChange}
              />
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold">
                Selected Color: {selectedColor}
              </h2>
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                onClick={copyToClipboard}
              >
                Copy
              </button>
            </div>
          </>
        )}
      </div>
      {showToast && (
        <div className="fixed bottom-0 right-0 m-4 rounded bg-green-500 p-2 text-white shadow-lg">
          {toastMessage}
        </div>
      )}
      <CustomContent category={category} />
    </>
  )
}

export default ImageColorPicker
