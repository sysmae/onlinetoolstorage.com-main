import React, { useState } from 'react'
import Papa from 'papaparse'
import { saveAs } from 'file-saver'

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
  const [jsonInput, setJsonInput] = useState('')
  const [csvData, setCsvData] = useState('')
  const [xmlData, setXmlData] = useState('')
  const [error, setError] = useState('')

  const handleUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      setJsonInput(e.target.result)
    }

    reader.readAsText(file)
  }

  const convertJSONtoCSV = () => {
    try {
      const jsonObj = JSON.parse(jsonInput)
      const csv = Papa.unparse(jsonObj, {
        header: true,
        skipEmptyLines: true,
      })
      setCsvData(csv)
    } catch (error) {
      console.error('Error parsing JSON to CSV: ', error)
      setError('JSON parsing error. Please check your JSON format.')
    }
  }

  const convertJSONtoXML = () => {
    try {
      const jsonObj = JSON.parse(jsonInput)
      let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n'
      jsonObj.forEach((row) => {
        xmlString += '  <row>\n'
        Object.entries(row).forEach(([key, value]) => {
          xmlString += `    <${key}>${value}</${key}>\n`
        })
        xmlString += '  </row>\n'
      })
      xmlString += '</root>'
      setXmlData(xmlString)
    } catch (error) {
      setError('JSON parsing error. Please check your JSON format.')
    }
  }

  const downloadCSV = () => {
    if (!csvData) {
      setError('No CSV data to download.')
      return
    }
    try {
      const BOM = '\uFEFF'
      const blob = new Blob([BOM + csvData], {
        type: 'text/csv;charset=utf-8;',
      })
      saveAs(blob, 'data.csv')
      setError('')
    } catch (error) {
      setError('Error saving the file.')
    }
  }

  const downloadXML = () => {
    const blob = new Blob([xmlData], { type: 'application/xml;charset=utf-8' })
    saveAs(blob, 'data.xml')
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container p-5">
        <h2 className="mb-5">JSON Converter</h2>
        <input
          type="file"
          accept=".json"
          onChange={handleUpload}
          className="file-upload mb-5"
        />
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Or enter JSON here"
          rows="10"
          className="json-input w-full mb-5 p-2 border-2 border-blue-500"
        />
        <div className="button-group mb-5">
          <button
            className="convert-button mr-2 bg-blue-500 text-white p-2"
            onClick={convertJSONtoCSV}
          >
            Convert to CSV
          </button>
          <button
            className="convert-button bg-blue-500 text-white p-2"
            onClick={convertJSONtoXML}
          >
            Convert to XML
          </button>
        </div>
        <div className="download-buttons mb-5">
          <button
            onClick={downloadCSV}
            className={`mr-2 p-2 text-white ${csvData ? 'bg-purple-500' : 'bg-gray-500'}`}
            disabled={!csvData}
          >
            Download CSV
          </button>
          <button
            onClick={downloadXML}
            className={`p-2 text-white ${xmlData ? 'bg-purple-500' : 'bg-gray-500'}`}
            disabled={!xmlData}
          >
            Download XML
          </button>
        </div>
        {error && <p className="error text-red-500">{error}</p>}
        {csvData && (
          <textarea
            value={csvData}
            readOnly
            rows="5"
            className="preview w-full mb-5 p-2 border-2 border-blue-500"
          />
        )}
        {xmlData && (
          <textarea
            value={xmlData}
            readOnly
            rows="5"
            className="preview w-full mb-5 p-2 border-2 border-blue-500"
          />
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}
