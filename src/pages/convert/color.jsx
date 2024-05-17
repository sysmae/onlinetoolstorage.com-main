import { useState } from 'react'
import Color from 'color'
import { SketchPicker } from 'react-color'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'convert'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function Home() {
  const [inputColor, setInputColor] = useState('')
  const [outputFormat, setOutputFormat] = useState('hex')
  const [convertedColor, setConvertedColor] = useState('')
  const [colorPickerColor, setColorPickerColor] = useState('#fff')

  const convertColor = () => {
    try {
      const newColor = Color(inputColor)
      let output
      switch (outputFormat) {
        case 'hex':
          output = newColor.hex()
          break
        case 'rgb':
          output = newColor.rgb().string()
          break
        case 'hsl':
          const hsl = newColor.hsl()
          output = `hsl(${hsl.color[0].toFixed(0)}, ${hsl.color[1].toFixed(1)}%, ${hsl.color[2].toFixed(1)}%)`
          break
        default:
          output = newColor.hex() // Default to HEX if format is unknown
      }
      setConvertedColor(output)
    } catch (error) {
      console.error('Invalid color input')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(convertedColor).then(
      () => {},
      (err) => console.error('Could not copy color: ', err),
    )
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex flex-col gap-2 justify-center items-center bg-gray-200 min-h-[50vh]">
        <SketchPicker
          color={colorPickerColor}
          onChangeComplete={(color) => {
            setColorPickerColor(color.hex)
            setInputColor(color.hex)
          }}
        />
        <input
          type="text"
          value={inputColor}
          onChange={(e) => setInputColor(e.target.value)}
          className="border p-2"
          placeholder="Enter a color (e.g., #ff5733)"
        />
        <select
          onChange={(e) => setOutputFormat(e.target.value)}
          className="border p-2 ml-2"
        >
          <option value="hex">HEX</option>
          <option value="rgb">RGB</option>
          <option value="hsl">HSL</option>
        </select>
        <button
          onClick={convertColor}
          className="bg-blue-500 text-white p-2 ml-2"
        >
          Convert
        </button>
        <div>Converted Color: {convertedColor}</div>
        <button
          onClick={copyToClipboard}
          className="bg-green-500 text-white p-2 ml-2"
        >
          Copy Color
        </button>
      </div>
      <CustomContent category={category} />
    </>
  )
}
