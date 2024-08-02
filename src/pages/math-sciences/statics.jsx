import { useState } from 'react'
import {
  calculateMean,
  calculateVariance,
  calculateStandardDeviation,
  calculateMedian,
  calculateMode,
  calculateRange,
  calculateQuartiles,
  calculateCovariance,
  calculateCorrelationCoefficient,
} from '@/lib/statistics'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const category = 'math-sciences'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
      locale,
    },
  }
}

export default function Home() {
  const [data, setData] = useState('')
  const [xData, setXData] = useState('')
  const [yData, setYData] = useState('')
  const [result, setResult] = useState('')
  const [correlationResult, setCorrelationResult] = useState('')

  const parseInput = (input) => {
    return input
      .trim() // 입력값의 앞뒤 공백을 제거합니다.
      .split(/[\s,]+/)
      .map(Number)
      .filter((n) => !isNaN(n))
  }

  const handleSingleDataSubmit = (e) => {
    e.preventDefault()
    const numbers = parseInput(data)
    const n = numbers.length
    const mean = calculateMean(numbers)
    const variance = calculateVariance(numbers, mean)
    const standardDeviation = calculateStandardDeviation(variance)
    const median = calculateMedian(numbers)
    const mode = calculateMode(numbers).join(', ')
    const range = calculateRange(numbers)
    const { q1, q2, q3 } = calculateQuartiles(numbers)

    setResult(
      `개수(n): ${n}\n평균: ${mean}\n분산: ${variance}\n표준편차: ${standardDeviation}\n최빈값: ${mode}\n범위: ${range}\n1사분위: ${q1}\n중앙값: ${q2}\n3사분위: ${q3}`,
    )
  }

  const handleDualDataSubmit = (e) => {
    e.preventDefault()
    const xNumbers = parseInput(xData)
    const yNumbers = parseInput(yData)

    if (xNumbers.length < 2 || yNumbers.length < 2) {
      setCorrelationResult(
        '오류: 데이터 세트는 최소 2개 이상의 데이터 포인트를 포함해야 합니다.',
      )
      return // 함수 실행을 여기서 중단합니다.
    }

    // 배열 x와 y의 길이가 다른 경우의 처리
    if (xNumbers.length !== yNumbers.length) {
      setCorrelationResult(
        '오류: 두 데이터 세트의 길이가 서로 다릅니다. 같은 수의 데이터 포인트를 입력해주세요.',
      )
      return // 함수 실행을 여기서 중단합니다.
    }

    try {
      setCorrelationResult(
        `공분산: ${calculateCovariance(xNumbers, yNumbers)}\n상관계수: ${calculateCorrelationCoefficient(xNumbers, yNumbers)}`,
      )
    } catch (error) {
      setCorrelationResult(`오류 처리: ${error.message}`)
    }
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="mx-auto max-w-xl space-y-4 p-4">
        {/* 단일 데이터 세트 분석 */}
        <form onSubmit={handleSingleDataSubmit} className="space-y-2">
          <input
            className="input input-bordered w-full max-w-xs px-4 py-2 text-lg" // 이 부분 추가
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="단일 데이터 세트 입력 (띄어쓰기 또는 쉼표로 구분)"
          />
          <button className="btn btn-primary px-4 py-2 text-lg" type="submit">
            단일 데이터 계산
          </button>
        </form>
        <pre className="whitespace-pre-wrap rounded-md bg-gray-100 p-4">
          {result ||
            '개수(n):\n평균:\n분산:\n표준편차:\n최빈값:\n범위:\n1사분위:\n중앙값:\n3사분위:'}
        </pre>
      </div>

      {/* 이중 데이터 세트 분석 */}
      <div>
        <form onSubmit={handleDualDataSubmit} className="space-y-2">
          <input
            className="input input-bordered w-full max-w-xs px-4 py-2 text-lg" // 이 부분 추가
            type="text"
            value={xData}
            onChange={(e) => setXData(e.target.value)}
            placeholder="X 데이터 세트 입력 (띄어쓰기 또는 쉼표로 구분)"
          />
          <input
            className="input input-bordered w-full max-w-xs px-4 py-2 text-lg" // 이 부분 추가
            type="text"
            value={yData}
            onChange={(e) => setYData(e.target.value)}
            placeholder="Y 데이터 세트 입력 (띄어쓰기 또는 쉼표로 구분)"
          />
          <button className="btn btn-primary px-4 py-2 text-lg" type="submit">
            이중 데이터 계산
          </button>
        </form>
        <pre className="whitespace-pre-wrap rounded-md bg-gray-100 p-4">
          {correlationResult || '공분산:\n상관계수:\n'}
        </pre>
      </div>
      <CustomContent category={category} />
    </>
  )
}
