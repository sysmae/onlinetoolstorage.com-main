import React, { useState } from 'react'

import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Decoder = ({ decode }) => {
  const [input, setInput] = useState('')
  const [key, setKey] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const handleDecrypt = () => {
    try {
      const decryptedData = decode(input, key)
      setOutput(decryptedData)
      setError('')
    } catch (error) {
      setError('Error during decryption')
      setOutput('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopySuccess(true)
      setTimeout(() => {
        setCopySuccess(false)
      }, 2000) // Hide message after 2 seconds
    })
  }

  return (
    <div className="flex flex-col xl:pt-12">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to decrypt..."
        rows="4"
        className="mb-2"
      />
      <Input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter decryption key..."
        className="mb-2"
      />
      <Button onClick={handleDecrypt} className="flex flex-1">
        Decrypt
      </Button>

      {output && (
        <div className="flex items-center justify-center gap-4">
          <p className="font-semibold">Encryption Result:</p>
          <p className="mb-2 rounded border border-gray-300 p-2">{output}</p>
          <Button onClick={handleCopy}>Copy</Button>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {copySuccess && <p className="text-green-500">Copied successfully!</p>}
    </div>
  )
}

export default Decoder
