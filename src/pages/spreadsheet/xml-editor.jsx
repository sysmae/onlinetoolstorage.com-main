import React, { useState } from 'react'
import xml2js from 'xml2js'
import format from 'xml-formatter'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'spreadsheet'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [xmlData, setXmlData] = useState(
    '<root>\n\t<child>Example</child>\n</root>',
  )
  const [xmlTree, setXmlTree] = useState(null)
  const [xmlError, setXmlError] = useState('')

  const parseXml = (xml) => {
    try {
      xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
        if (err) {
          setXmlError('Invalid XML: ' + err)
          setXmlTree(null)
        } else {
          setXmlError('')
          setXmlTree(JSON.stringify(result, null, 4))
        }
      })
    } catch (err) {
      setXmlError('Parsing error: ' + err.message)
    }
  }

  const handleXmlChange = (newXml) => {
    setXmlData(newXml)
    try {
      const formattedXml = format(newXml, { collapseContent: true })
      parseXml(formattedXml) // Validate immediately after formatting
    } catch (error) {
      setXmlError('Formatting error: ' + error.message)
    }
  }

  const lintXml = () => {
    try {
      const formattedXml = format(xmlData, { collapseContent: true })
      setXmlData(formattedXml)
      parseXml(formattedXml)
    } catch (error) {
      setXmlError('Formatting error: ' + error.message)
    }
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto p-5">
        <h2 className="text-2xl font-bold mb-5">XML Editor</h2>
        <textarea
          className="w-full p-5 bg-gray-200 rounded"
          rows="10"
          value={xmlData}
          onChange={(e) => handleXmlChange(e.target.value)}
        ></textarea>
        <button
          onClick={lintXml}
          className="mt-2 mb-5 p-2 bg-blue-500 text-white rounded"
        >
          Lint XML
        </button>
        {xmlError && <div className="text-red-500">{xmlError}</div>}
        <h2 className="text-2xl font-bold mt-5 mb-2">XML Tree</h2>
        <pre className="p-5 bg-gray-200 rounded">{xmlTree}</pre>
      </div>
      <CustomContent category={category} />
    </>
  )
}
