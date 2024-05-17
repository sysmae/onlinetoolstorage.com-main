import { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'crypto'

const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const specialCharacters = "!@#$%^&*()_+-=[]{}|;':,.<>/?"

function generatePassword(length, options) {
  let characters = lowerCaseLetters
  if (options.includeUpperCase) characters += upperCaseLetters
  if (options.includeNumbers) characters += numbers
  if (options.includeSpecialChars) characters += specialCharacters

  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    password += characters[randomIndex]
  }
  return password
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function Home() {
  const [passwordLength, setPasswordLength] = useState(12)
  const [includeUpperCase, setIncludeUpperCase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true)
  const [generatedPassword, setGeneratedPassword] = useState('')
  const [copySuccess, setCopySuccess] = useState('')

  const handleGenerate = () => {
    setGeneratedPassword(
      generatePassword(passwordLength, {
        includeUpperCase,
        includeNumbers,
        includeSpecialChars,
      }),
    )
  }

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password).then(
      () => setCopySuccess('Copied!'),
      () => setCopySuccess('Copy failed.'),
    )
  }
  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="mx-auto p-4">
        <div className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
            />
            <span className="ml-2">Include uppercase</span>
          </label>
        </div>
        <div className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            <span className="ml-2">Include numbers</span>
          </label>
        </div>
        <div className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={includeSpecialChars}
              onChange={(e) => setIncludeSpecialChars(e.target.checked)}
            />
            <span className="ml-2">Include special characters</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            <span className="text-gray-700">Password length:</span>
            <input
              type="number"
              className="form-input mt-1 block w-full"
              value={passwordLength}
              onChange={(e) => setPasswordLength(parseInt(e.target.value, 10))}
              min="4"
              max="20"
            />
          </label>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          onClick={handleGenerate}
        >
          Generate
        </button>
        {generatedPassword && (
          <>
            <div className="mt-4 p-2 bg-gray-100 border rounded">
              Generated password:
              <span className="font-bold">{generatedPassword}</span>
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              onClick={() => copyToClipboard(generatedPassword)}
            >
              Copy to clipboard
            </button>
            {copySuccess && (
              <div className="text-sm text-green-500 mt-2">{copySuccess}</div>
            )}
          </>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}
