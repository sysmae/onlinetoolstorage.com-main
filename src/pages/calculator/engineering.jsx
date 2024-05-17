import React, { useState } from 'react'
import { evaluate } from 'mathjs'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'calculator'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category])),
      locale,
    },
  }
}

export default function Home() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleCalculation = () => {
    try {
      const output = evaluate(input)
      setResult(output.toString())
    } catch (error) {
      setResult('Error: Invalid input')
    }
  }

  const addToInput = (value) => {
    setInput(input + value)
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto px-4">
        <h1 className="text-center text-2xl font-bold my-4">
          Engineering Calculator
        </h1>
        <div className="flex justify-center">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="border-2 border-gray-300 p-2 rounded-lg mr-2 flex-1"
            placeholder="Enter calculation"
          />
          <button
            onClick={handleCalculation}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Calculate
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {/* Basic operations */}
          <button onClick={() => addToInput(' + ')} className="operation">
            +
          </button>
          <button onClick={() => addToInput(' - ')} className="operation">
            -
          </button>
          <button onClick={() => addToInput(' * ')} className="operation">
            *
          </button>
          <button onClick={() => addToInput(' / ')} className="operation">
            /
          </button>

          {/* Trigonometric functions */}
          <button onClick={() => addToInput('sin(')} className="function">
            sin
          </button>
          <button onClick={() => addToInput('cos(')} className="function">
            cos
          </button>
          <button onClick={() => addToInput('tan(')} className="function">
            tan
          </button>

          {/* Logarithmic and exponential functions */}
          <button onClick={() => addToInput('log(')} className="function">
            log
          </button>
          <button onClick={() => addToInput('exp(')} className="function">
            exp
          </button>
          <button onClick={() => addToInput('sqrt(')} className="function">
            sqrt
          </button>
          <button onClick={() => addToInput('^')} className="operation">
            ^
          </button>

          {/* Constants and more */}
          <button onClick={() => addToInput('pi')} className="constant">
            π
          </button>
          <button onClick={() => addToInput('e')} className="constant">
            e
          </button>
          <button onClick={() => addToInput('1/(')} className="operation">
            1/x
          </button>
          <button onClick={() => addToInput('!')} className="operation">
            !
          </button>

          {/* Parentheses for proper syntax */}
          <button onClick={() => addToInput('(')} className="other">
            {' '}
            ({' '}
          </button>
          <button onClick={() => addToInput(')')} className="other">
            {' '}
            ){' '}
          </button>

          {/* Clear and backspace for convenience */}
          <button onClick={() => setInput('')} className="other">
            C
          </button>
          <button
            onClick={() => setInput(input.slice(0, -1))}
            className="other"
          >
            ←
          </button>
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold">Result</h2>
          <p className="text-lg">{result}</p>
        </div>
      </div>
      <CustomContent category={category} />
    </>
  )
}
