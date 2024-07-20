import React, { useState, useCallback } from 'react'
import Papa from 'papaparse'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

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

const TableViewer = ({ data }) => {
  // 샘플 데이터 정의
  const sampleData = [
    {
      Name: 'Sample 1',
      Value: '123',
      Description: 'This is a sample description 1.',
    },
    {
      Name: 'Sample 2',
      Value: '456',
      Description: 'This is a sample description 2.',
    },
    {
      Name: 'Sample 3',
      Value: '789',
      Description: 'This is a sample description 3.',
    },
  ]

  // 실제 데이터가 없을 경우 샘플 데이터 사용
  const displayData = data && data.length > 0 ? data : sampleData

  return (
    <div className="overflow-x-auto mt-3">
      <table className="w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            {Object.keys(displayData[0]).map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, valueIndex) => (
                <td
                  key={valueIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Home() {
  const [csvContent, setCsvContent] = useState([])
  const handleUpload = useCallback((event) => {
    // files 배열이 존재하고, 적어도 하나의 파일이 선택되었는지 확인
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      Papa.parse(file, {
        complete: (results) => {
          setCsvContent(results.data)
        },
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      })
    } else {
      // 사용자가 파일을 선택하지 않고 대화 상자를 취소한 경우
      console.log('No file selected.')
    }
  }, [])

  const convertToJSON = () => {
    const jsonString = JSON.stringify(csvContent)
    const blob = new Blob([jsonString], {
      type: 'application/json;charset=utf-8',
    })
    saveAs(blob, 'data.json')
  }

  const convertToXML = () => {
    let xmlString = '<root>\n'
    csvContent.forEach((row) => {
      xmlString += '  <row>\n'
      Object.entries(row).forEach(([key, value]) => {
        xmlString += `    <${key}>${value}</${key}>\n`
      })
      xmlString += '  </row>\n'
    })
    xmlString += '</root>'
    const blob = new Blob([xmlString], {
      type: 'application/xml;charset=utf-8',
    })
    saveAs(blob, 'data.xml')
  }

  const convertToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(csvContent)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, 'data.xlsx')
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">CSV Converter</h1>

        {/* 파일 업로드 섹션 */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Upload CSV</h2>
          <input
            type="file"
            accept=".csv"
            onChange={handleUpload}
            className="border border-gray-300 p-2"
          />
        </div>

        {/* 다운로드 버튼 섹션 */}
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={convertToJSON}
          >
            Download to JSON
          </button>
          <button
            onClick={convertToXML}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Download to XML
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={convertToExcel}
          >
            Download to Excel
          </button>
        </div>

        {/* CSV 뷰어 섹션 */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">CSV Viewer</h2>

          <TableViewer data={csvContent} />
        </div>

        {/* JSON 섹션 */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">JSON</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={convertToJSON}
          >
            Download to JSON
          </button>
          <pre>{JSON.stringify(csvContent, null, 2)}</pre>
        </div>

        {/* XML 섹션 */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">XML</h2>
          <button
            onClick={convertToXML}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Download to XML
          </button>
          <pre>
            {`<root>\n`}
            {csvContent.map((row) => {
              let xmlString = '  <row>\n'
              Object.entries(row).forEach(([key, value]) => {
                xmlString += `    <${key}>${value}</${key}>\n`
              })
              xmlString += '  </row>\n'
              return xmlString
            })}
            {`</root>`}
          </pre>
        </div>

        {/* Excel 섹션 */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Excel</h2>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={convertToExcel}
          >
            Download to Excel
          </button>
          <TableViewer data={csvContent} />
        </div>
      </div>
      <CustomContent category={category} />
    </>
  )
}
