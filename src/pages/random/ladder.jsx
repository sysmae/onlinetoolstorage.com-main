import React, { useState } from 'react'
import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const category = 'random'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [numPairs, setNumPairs] = useState(1)
  const [inputs, setInputs] = useState([])
  const [outputs, setOutputs] = useState([])
  const [results, setResults] = useState([])
  const [isStarted, setIsStarted] = useState(false)

  const handleNumPairsChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10))
    setNumPairs(value)
  }

  const generateFields = () => {
    setInputs(Array(numPairs).fill(''))
    setOutputs(Array(numPairs).fill(''))
    setResults([])
    setIsStarted(false)
  }

  const handleInputChange = (index, value) => {
    const updatedInputs = [...inputs]
    updatedInputs[index] = value
    setInputs(updatedInputs)
  }

  const handleOutputChange = (index, value) => {
    const updatedOutputs = [...outputs]
    updatedOutputs[index] = value
    setOutputs(updatedOutputs)
  }

  const startGame = () => {
    // Validate that none of the inputs or outputs are empty
    if (inputs.some((input) => !input) || outputs.some((output) => !output)) {
      alert('Please fill in all input and output fields.')
      return
    }

    // Shuffle inputs and outputs
    const shuffledInputs = [...inputs].sort(() => 0.5 - Math.random())
    const shuffledOutputs = [...outputs].sort(() => 0.5 - Math.random())

    const pairedResults = shuffledInputs.map((input, index) => ({
      input,
      output: shuffledOutputs[index],
    }))

    setResults(pairedResults)
    setIsStarted(true)
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="p-4 xl:pt-24">
        <Input
          type="number"
          min="1"
          value={numPairs}
          onChange={handleNumPairsChange}
          className="mb-4 w-full rounded-lg border border-gray-300 p-2 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
          placeholder="Number of pairs"
        />
        <Button
          className="mb-4 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={generateFields}
        >
          Generate Fields
        </Button>
        {inputs.length > 0 && (
          <div className="mb-4">
            {inputs.map((_, index) => (
              <div key={index} className="mb-2 flex gap-4">
                <div className="flex-1">
                  <Input
                    className="w-full rounded-lg border border-gray-300 p-2 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    placeholder={`Input ${index + 1}`}
                    value={inputs[index] || ''}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    className="w-full rounded-lg border border-gray-300 p-2 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    placeholder={`Output ${index + 1}`}
                    value={outputs[index] || ''}
                    onChange={(e) => handleOutputChange(index, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {inputs.length > 0 && (
          <Button
            className="mb-4 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={startGame}
          >
            Start
          </Button>
        )}
        {isStarted && (
          <div className="relative mt-6 p-4">
            <div className="absolute inset-0">
              <div className="relative">
                <div className="flex flex-col items-center">
                  {results.map((result, index) => (
                    <div key={index} className="mb-4 flex items-center">
                      <div className="w-32 rounded-lg border border-gray-300 bg-gray-100 p-2 text-center dark:bg-gray-800">
                        {result.input}
                      </div>
                      <div
                        className="grow border-t-2 border-blue-500"
                        style={{ height: '2px' }}
                      ></div>
                      <div className="w-32 rounded-lg border border-gray-300 bg-green-100 p-2 text-center dark:bg-gray-800">
                        {result.output}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <CustomContent category={category} />
    </>
  )
}
