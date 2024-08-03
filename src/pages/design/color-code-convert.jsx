import { useState } from 'react'
import Color from 'color'
import { SketchPicker } from 'react-color'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Button } from '@/components/ui/button'
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
      <div className="xl:pt-16"></div>
      <div className="flex flex-col items-center justify-center gap-2 ">
        <SketchPicker
          color={colorPickerColor}
          onChangeComplete={(color) => {
            setColorPickerColor(color.hex)
            setInputColor(color.hex)
          }}
          className="dark:text-slate-900"
        />
        <div className="flex xl:pt-16">
          <Input
            type="text"
            value={inputColor}
            onChange={(e) => setInputColor(e.target.value)}
            className="w-fit border p-2"
            placeholder="Enter a color (e.g., #ff5733)"
          />
          <select
            onChange={(e) => setOutputFormat(e.target.value)}
            className="ml-2 border p-2 dark:bg-slate-900"
          >
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
            <option value="hsl">HSL</option>
          </select>
          <Button
            onClick={convertColor}
            className="ml-2 bg-blue-500 p-2 text-white"
          >
            Convert
          </Button>
        </div>
        <div className="flex items-center">
          <div className="dark:text-gray-300">
            Converted Color: {convertedColor}
          </div>
          <Button
            onClick={copyToClipboard}
            className="ml-2 bg-green-500 p-2 text-white"
          >
            Copy Color
          </Button>
        </div>
      </div>
      <CustomContent category={category} />
    </>
  )
}
