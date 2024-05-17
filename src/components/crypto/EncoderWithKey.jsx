import React, { useState } from 'react'

const Encoder = ({ encode }) => {
  const [input, setInput] = useState('')
  const [key, setKey] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const handleEncrypt = () => {
    try {
      const encryptedData = encode(input, key)
      setOutput(encryptedData)
      setError('')
    } catch (error) {
      setError('Error during encryption')
      setOutput('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopySuccess(true)
      setTimeout(() => {
        setCopySuccess(false)
      }, 2000) // Hide the message after 2 seconds
    })
  }

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to encrypt..."
        rows="4"
        className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
      />
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter encryption key..."
        className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
      />
      <button
        onClick={handleEncrypt}
        className="mr-2 mb-2 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
      >
        Encrypt
      </button>

      {output && (
        <>
          <div>
            <h3 className="font-semibold">Encryption Result:</h3>
            <p className="mb-2 p-2 border border-gray-300 rounded">{output}</p>
          </div>
          <button
            onClick={handleCopy}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
          >
            Copy
          </button>
        </>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {copySuccess && <p className="text-green-500">Copied successfully!</p>}
    </div>
  )
}

export default Encoder
