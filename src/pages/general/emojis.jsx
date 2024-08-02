import React, { useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'general'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setToastMessage(`Copied to Clipboard: ${text}`)
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

  const handleEmojiSelect = (emoji) => {
    const emojiChar = emoji.native
    setInputValue((prev) => prev + emojiChar) // Append emoji to the input
    copyToClipboard(emojiChar) // Also copy the emoji directly to the clipboard
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="flex min-h-[50vh] flex-col items-center justify-center bg-gray-200">
        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="mt-4 w-full max-w-xs rounded border border-gray-300 p-2"
        />
        <button
          onClick={() => copyToClipboard(inputValue)}
          className="mt-4 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Copy Emojis
        </button>
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
