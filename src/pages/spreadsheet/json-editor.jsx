import React, { useState } from 'react'
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
  const [jsonInput, setJsonInput] = useState('')
  const [jsonOutput, setJsonOutput] = useState('')
  const [error, setError] = useState('')
  const [alertMsg, setAlertMsg] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target.result
        formatJson(text)
      }
      reader.readAsText(file)
    } else {
      setError('Please upload a valid JSON file.')
    }
  }

  const showTemporaryAlert = (message) => {
    setAlertMsg(message)
    setTimeout(() => {
      setAlertMsg('')
    }, 2000) // 메시지는 2초 후에 사라집니다.
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        showTemporaryAlert('Copied to clipboard!')
      },
      (err) => {
        setError('Failed to copy: ' + err)
      },
    )
  }

  const downloadJson = (text, filename) => {
    const blob = new Blob([text], { type: 'application/json;charset=utf-8' })
    saveAs(blob, filename || 'formatted.json')
    showTemporaryAlert('File downloaded!')
  }

  const formatJson = (input) => {
    try {
      // Parse the JSON input, then stringify it with indentation
      const parsedJson = JSON.parse(input)
      const formattedJson = JSON.stringify(parsedJson, null, 2)
      setJsonOutput(formattedJson)
      setJsonInput(formattedJson)
      setError('')
    } catch (err) {
      setError('Invalid JSON: ' + err.message)
    }
  }

  const handleFormatClick = () => {
    formatJson(jsonInput)
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto p-4 space-y-4">
        <h2 className="text-2xl font-bold">JSON Editor</h2>
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="block w-full text-md text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
        />
        {error && <p className="text-red-500">{error}</p>}
        {alertMsg && (
          <div className="text-center py-2 text-green-600">{alertMsg}</div>
        )}
        <div className="flex gap-2">
          <button
            className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleFormatClick}
          >
            Format JSON
          </button>
          <button
            className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => copyToClipboard(jsonOutput)}
          >
            Copy to Clipboard
          </button>
          <button
            className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => downloadJson(jsonOutput, 'formatted.json')}
          >
            Download JSON
          </button>
        </div>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter or paste your JSON here..."
          rows="10"
          className="w-full p-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        ></textarea>
        <div className="json-output bg-gray-100 rounded-lg p-2">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <pre>{jsonOutput}</pre>
          )}
        </div>
      </div>
      <CustomContent category={category} />
    </>
  )
}
