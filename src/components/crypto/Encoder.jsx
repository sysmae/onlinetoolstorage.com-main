import React, { useState } from 'react'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const Encoder = ({ encode }) => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const handleEncode = () => {
    try {
      const encodedData = encode(input)
      setOutput(encodedData)
      setError('')
    } catch (error) {
      setError('Error during encoding')
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
        placeholder="Enter text to encode..."
        rows="4"
        className="mb-2"
      />
      <Button className="flex flex-1" onClick={handleEncode}>
        Encode
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

export default Encoder
