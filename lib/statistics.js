// lib/statistics.js
export const calculateMean = (numbers) => {
  return numbers.reduce((acc, val) => acc + val, 0) / numbers.length
}

export const calculateVariance = (numbers, mean) => {
  return (
    numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
    numbers.length
  )
}

export const calculateStandardDeviation = (variance) => {
  return Math.sqrt(variance)
}

export const calculateMedian = (numbers) => {
  const sortedNumbers = [...numbers].sort((a, b) => a - b)
  const mid = Math.floor(sortedNumbers.length / 2)
  return sortedNumbers.length % 2 !== 0
    ? sortedNumbers[mid]
    : (sortedNumbers[mid - 1] + sortedNumbers[mid]) / 2
}

export const calculateMode = (numbers) => {
  const frequencyMap = {}
  let maxFreq = 0
  let modes = []

  numbers.forEach((num) => {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1
    if (frequencyMap[num] > maxFreq) {
      maxFreq = frequencyMap[num]
      modes = [num]
    } else if (frequencyMap[num] === maxFreq) {
      modes.push(num)
    }
  })

  return modes.length === numbers.length ? [] : modes
}

export const calculateRange = (numbers) => {
  return Math.max(...numbers) - Math.min(...numbers)
}

export const calculateQuartiles = (numbers) => {
  const sortedNumbers = [...numbers].sort((a, b) => a - b)
  const q1 = calculateMedian(
    sortedNumbers.slice(0, Math.floor(sortedNumbers.length / 2)),
  )
  const q3 = calculateMedian(
    sortedNumbers.slice(Math.ceil(sortedNumbers.length / 2)),
  )
  return { q1, q2: calculateMedian(sortedNumbers), q3 }
}

export const calculateCovariance = (x, y) => {
  if (x.length !== y.length) {
    throw new Error('Arrays x and y must have the same length')
  }
  const meanX = calculateMean(x)
  const meanY = calculateMean(y)
  return (
    x.reduce((acc, curr, idx) => acc + (curr - meanX) * (y[idx] - meanY), 0) /
    x.length
  )
}

export const calculateCorrelationCoefficient = (x, y) => {
  if (x.length !== y.length) {
    throw new Error('Arrays x and y must have the same length')
  }
  const meanX = calculateMean(x)
  const meanY = calculateMean(y)
  const standardDeviationX = calculateStandardDeviation(
    calculateVariance(x, meanX),
  )
  const standardDeviationY = calculateStandardDeviation(
    calculateVariance(y, meanY),
  )
  const covariance = calculateCovariance(x, y)

  return covariance / (standardDeviationX * standardDeviationY)
}

export const calculateLinearRegression = (x, y) => {
  const meanX = calculateMean(x)
  const meanY = calculateMean(y)
  const slope = calculateCovariance(x, y) / calculateVariance(x, meanX)
  const intercept = meanY - slope * meanX

  return { slope, intercept }
}
