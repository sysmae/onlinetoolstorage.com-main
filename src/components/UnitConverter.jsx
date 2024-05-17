import React, { useState } from 'react'
import convert from 'convert-units'

const UnitConverter = ({ units }) => {
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState(units[0])
  const [toUnit, setToUnit] = useState(units[0])
  const [tempToUnit, setTempToUnit] = useState(units[0]) // Temporary toUnit state
  const [result, setResult] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleConvert = () => {
    try {
      setErrorMessage('')
      let convertedValue = convert(value).from(fromUnit).to(tempToUnit)
      if (typeof convertedValue !== 'number') {
        convertedValue = parseFloat(convertedValue)
      }
      setResult(convertedValue.toFixed(2))
      setToUnit(tempToUnit)
    } catch (error) {
      setErrorMessage(
        'Please check the input value or units. They might be incorrect.',
      )
      setResult('')
    }
  }

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow dark:bg-gray-800 dark:text-gray-200">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Value:
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value to convert"
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-3 px-4 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            From Unit:
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            To Unit:
          </label>
          <select
            value={tempToUnit}
            onChange={(e) => setTempToUnit(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleConvert}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
      >
        Convert
      </button>
      {result && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Result: {result} {toUnit}
        </p>
      )}
      {errorMessage && (
        <p className="text-sm text-red-500 dark:text-red-400">{errorMessage}</p>
      )}
    </div>
  )
}

export default UnitConverter
