import React, { useState } from 'react'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const Decoder = ({ decode }) => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const handleDecode = () => {
    try {
      const decodedData = decode(input)
      setOutput(decodedData)
      setError('')
    } catch (error) {
      setError('Error during decoding')
      setOutput('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(output)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => {
          setCopySuccess(false)
        }, 2000) // Hide message after 2 seconds
      })
      .catch((err) => {
        setError('Copy failed')
      })
  }

  return (
    <div className="flex flex-col xl:pt-12">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to decode..."
        rows="4"
      />
      <Button className="flex flex-1" onClick={handleDecode}>
        Decode
      </Button>
      {output && (
        <>
          <div>
            <h3 className="font-semibold">Decoding Result:</h3>
            <p className="mb-2 rounded border border-gray-300 p-2">{output}</p>
          </div>
          <Button onClick={handleCopy}>Copy</Button>
        </>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {copySuccess && <p className="text-green-500">Copied successfully!</p>}
    </div>
  )
}

export default Decoder
