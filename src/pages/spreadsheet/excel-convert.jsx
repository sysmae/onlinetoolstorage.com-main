import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { parse as parseXml } from 'js2xmlparser'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'spreadsheet'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function Home() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const convertToFile = (format) => {
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]

      switch (format) {
        case 'csv':
          const csv = XLSX.utils.sheet_to_csv(worksheet)
          downloadFile('\uFEFF' + csv, 'data.csv', 'text/csv')
          break
        case 'json':
          const json = XLSX.utils.sheet_to_json(worksheet)
          downloadFile(
            JSON.stringify(json, null, 2),
            'data.json',
            'application/json',
          )
          break
        case 'xml':
          try {
            const jsonForXml = sanitizeKeys(
              XLSX.utils.sheet_to_json(worksheet, { raw: false }),
            )
            const xml = parseXml('root', jsonForXml)
            downloadFile(xml, 'data.xml', 'application/xml')
          } catch (err) {
            setError(err.message)
            setTimeout(() => setError(''), 2000) // Clear error after 2 seconds
          }
          break
        default:
          break
      }
    }
    reader.readAsBinaryString(file)
  }

  const sanitizeKeys = (data) => {
    return data.map((entry) => {
      const sanitizedEntry = {}
      Object.keys(entry).forEach((key) => {
        let sanitizedKey = key.replace(/[^\w]/g, '_') // Replace non-word chars with '_'
        if (/\d/.test(sanitizedKey.charAt(0))) {
          // If starts with a digit, prefix with '_'
          sanitizedKey = '_' + sanitizedKey
        }
        sanitizedEntry[sanitizedKey] = entry[key]
      })
      return sanitizedEntry
    })
  }

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` })
    saveAs(blob, filename)
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <h2>Excel File Converter</h2>
      <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
      <button onClick={() => convertToFile('csv')}>Convert to CSV</button>
      <button onClick={() => convertToFile('json')}>Convert to JSON</button>
      <button onClick={() => convertToFile('xml')}>Convert to XML</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <CustomContent category={category} />
    </>
  )
}
