import React, { useState } from 'react'
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

export default function Home() {
  const [excelData, setExcelData] = useState([])
  const [filename, setFilename] = useState('')
  const [error, setError] = useState('')
  const [selectedCell, setSelectedCell] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) {
      setError('파일을 선택해주세요.')
      return
    }
    setFilename(file.name)
    setError('')
    const reader = new FileReader()
    reader.onload = (e) => {
      const binaryStr = e.target.result
      const workBook = XLSX.read(binaryStr, { type: 'binary' })
      const sheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[sheetName]
      const data = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
      setExcelData(data)
    }
    reader.readAsBinaryString(file)
  }

  const handleCellClick = (cell) => {
    setSelectedCell(cell)
  }

  const handleSaveToFile = () => {
    try {
      const workSheet = XLSX.utils.aoa_to_sheet(excelData)
      const workBook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1')
      XLSX.writeFile(workBook, filename || 'spreadsheet.xlsx')
    } catch (error) {
      setError('파일 저장 중 오류가 발생했습니다: ' + error.message)
    }
  }

  const editCell = (rowIndex, colKey, value) => {
    const newData = [...excelData]
    newData[rowIndex][colKey] = value
    setexcelData(newData)
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        {error && <p className="text-red-500">{error}</p>}
        {selectedCell && (
          <div
            className="border-l-4 border-indigo-500 bg-indigo-100 p-4 text-indigo-700"
            role="alert"
          >
            <p>
              Selected Cell : <span className="font-bold">{selectedCell}</span>
            </p>
          </div>
        )}
        <div
          className="overflow-auto rounded-lg bg-white shadow "
          style={{ height: '300px' }}
        >
          <table className="whitespace-no-wrap table-striped w-full table-auto border-collapse bg-white">
            <thead>
              {excelData.length > 0 && (
                <tr className="text-left">
                  {Object.keys(excelData[0]).map((header, index) => (
                    <th key={index} className="bg-blue-500 p-2 text-white">
                      {header}
                    </th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {excelData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {Object.keys(row).map((colKey) => (
                    <td
                      key={colKey}
                      className="border-t border-dashed border-gray-200 p-2"
                    >
                      <input
                        type="text"
                        value={row[colKey]}
                        onClick={() => {
                          handleCellClick(row[colKey])
                        }}
                        onChange={(e) =>
                          editCell(rowIndex, colKey, e.target.value)
                        }
                        className="w-full p-1 px-2 text-gray-700 outline-none"
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
