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
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function Home() {
  const [csvData, setCsvData] = useState([])
  const [filename, setFilename] = useState('')
  const [error, setError] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) {
      setError('파일을 선택해주세요.')
      return
    }
    setFilename(file.name)
    setError('')
    Papa.parse(file, {
      encoding: 'UTF-8',
      complete: (results) => {
        if (results.errors.length) {
          setError('파일 파싱 중 오류가 발생했습니다.')
          return
        }
        setCsvData(results.data)
      },
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      error: (error) => {
        setError('파일을 읽는 도중 오류가 발생했습니다: ' + error.message)
      },
    })
  }

  const handleSaveToFile = () => {
    if (!csvData.length) {
      setError('저장할 데이터가 없습니다.')
      return
    }
    try {
      const BOM = '\uFEFF'
      const csv = Papa.unparse(csvData)
      const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' })
      saveAs(blob, filename || 'data.csv')
      setError('')
    } catch (error) {
      setError('파일 저장 중 오류가 발생했습니다.')
    }
  }

  const editCell = (rowIndex, colKey, value) => {
    const newData = [...csvData]
    newData[rowIndex][colKey] = value
    setCsvData(newData)
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        {error && <p className="text-red-500">{error}</p>}
        <div
          className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative"
          style={{ height: '300px' }}
        >
          <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
            <thead>
              {csvData.length > 0 && (
                <tr className="text-left">
                  {Object.keys(csvData[0]).map((header, index) => (
                    <th key={index} className="bg-blue-500 text-white p-2">
                      {header}
                    </th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {csvData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {Object.keys(row).map((colKey) => (
                    <td
                      key={colKey}
                      className="p-2 border-dashed border-t border-gray-200"
                    >
                      <input
                        type="text"
                        value={row[colKey]}
                        onChange={(e) =>
                          editCell(rowIndex, colKey, e.target.value)
                        }
                        className="w-full p-1 px-2 outline-none text-gray-700"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleSaveToFile}>Save to File</button>
      </div>
      <CustomContent category={category} />
    </>
  )
}
