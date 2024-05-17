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
  calculateLinearRegression,
} from '../../../lib/statistics'

import { Line } from 'react-chartjs-2'
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from 'chart.js'

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
  const [data, setData] = useState('')
  const [xData, setXData] = useState('')
  const [yData, setYData] = useState('')
  const [result, setResult] = useState('')
  const [correlationResult, setCorrelationResult] = useState('')
  const [linearRegressionResult, setLinearRegressionResult] = useState(null) // 회귀 분석 결과 상태 추가

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
      const { slope, intercept } = calculateLinearRegression(xNumbers, yNumbers)
      setCorrelationResult(
        `공분산: ${calculateCovariance(xNumbers, yNumbers)}\n상관계수: ${calculateCorrelationCoefficient(xNumbers, yNumbers)}\n선형 회귀 기울기: ${slope}\n선형 회귀 y절편: ${intercept}`,
      )
      setLinearRegressionResult({ slope, intercept })
    } catch (error) {
      setCorrelationResult(`오류 처리: ${error.message}`)
    }
  }
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  )

  const RegressionChart = ({ xData, yData, slope, intercept }) => {
    // 원본 데이터 포인트
    const dataPoints = xData.map((x, index) => ({ x, y: yData[index] }))

    const options = {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
        },
        y: {
          beginAtZero: true,
        },
      },
    }

    // 회귀 직선의 데이터 포인트 생성
    const linePoints = xData.map((x) => ({
      x,
      y: slope * x + intercept,
    }))

    const data = {
      datasets: [
        {
          label: '원본 데이터',
          data: dataPoints,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          type: 'scatter',
          showLine: false, // 선을 그리지 않습니다.
        },
        {
          label: '회귀 직선',
          data: linePoints,
          borderColor: 'rgba(53, 162, 235, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    }

    return <Line data={data} options={options} />
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="max-w-xl mx-auto p-4 space-y-4">
        {/* 단일 데이터 세트 분석 */}
        <form onSubmit={handleSingleDataSubmit} className="space-y-2">
          <input
            className="input input-bordered w-full max-w-xs text-lg py-2 px-4" // 이 부분 추가
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="단일 데이터 세트 입력 (띄어쓰기 또는 쉼표로 구분)"
          />
          <button className="btn btn-primary text-lg py-2 px-4" type="submit">
            단일 데이터 계산
          </button>
        </form>
        <pre className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">
          {result ||
            '개수(n):\n평균:\n분산:\n표준편차:\n최빈값:\n범위:\n1사분위:\n중앙값:\n3사분위:'}
        </pre>
      </div>

      {/* 이중 데이터 세트 분석 */}
      <div>
        <form onSubmit={handleDualDataSubmit} className="space-y-2">
          <input
            className="input input-bordered w-full max-w-xs text-lg py-2 px-4" // 이 부분 추가
            type="text"
            value={xData}
            onChange={(e) => setXData(e.target.value)}
            placeholder="X 데이터 세트 입력 (띄어쓰기 또는 쉼표로 구분)"
          />
          <input
            className="input input-bordered w-full max-w-xs text-lg py-2 px-4" // 이 부분 추가
            type="text"
            value={yData}
            onChange={(e) => setYData(e.target.value)}
            placeholder="Y 데이터 세트 입력 (띄어쓰기 또는 쉼표로 구분)"
          />
          <button className="btn btn-primary text-lg py-2 px-4" type="submit">
            이중 데이터 계산
          </button>
        </form>
        <pre className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">
          {correlationResult ||
            '공분산:\n상관계수:\n선형 회귀 기울기:\n선형 회귀 y절편:'}
        </pre>
        <div style={{ height: '300px' }}>
          {/* 이 div의 높이를 그래프의 높이에 맞게 조정하세요 */}
          {linearRegressionResult && (
            <RegressionChart
              xData={parseInput(xData)}
              yData={parseInput(yData)}
              slope={linearRegressionResult.slope}
              intercept={linearRegressionResult.intercept}
            />
          )}
        </div>
      </div>
      <CustomContent category={category} />
    </>
  )
}
