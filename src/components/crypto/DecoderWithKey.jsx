import React, { useState } from 'react'

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
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to decrypt..."
        rows="4"
        className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
      />
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter decryption key..."
        className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
      />
      <button
        onClick={handleDecrypt}
        className="mr-2 mb-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      >
        Decrypt
      </button>

      {output && (
        <>
          <div>
            <h3 className="font-semibold">Decryption Result:</h3>
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

export default Decoder
