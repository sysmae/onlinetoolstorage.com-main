import { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const category = 'general'

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
      ...(await serverSideTranslations(locale, [category, 'common'])),
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
      () => {
        setCopySuccess('Copied!')
        setTimeout(() => setCopySuccess(''), 3000) // 3초 후에 알림 사라짐
      },
      () => {
        setCopySuccess('Copy failed.')
        setTimeout(() => setCopySuccess(''), 3000) // 3초 후에 알림 사라짐
      },
    )
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="mx-auto flex flex-col gap-4 p-4 xl:mt-12">
        <div className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
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
              checked={includeSpecialChars}
              onChange={(e) => setIncludeSpecialChars(e.target.checked)}
            />
            <span className="ml-2">Include special characters</span>
          </label>
        </div>
        <div className="mb-4 flex flex-col">
          <span>Password length:</span>
          <Input
            type="number"
            value={passwordLength}
            onChange={(e) => setPasswordLength(parseInt(e.target.value, 10))}
            min="4"
            max="20"
          />
          <Button onClick={handleGenerate}>Generate</Button>
        </div>

        {generatedPassword && (
          <>
            <div className="mt-4 p-2">
              Generated password:
              <span className="font-bold">{generatedPassword}</span>
            </div>
            <Button onClick={() => copyToClipboard(generatedPassword)}>
              Copy to clipboard
            </Button>

            {copySuccess && (
              <div className="mt-2 text-sm text-green-500">{copySuccess}</div>
            )}
          </>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}
