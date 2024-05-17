import { useState } from 'react'

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
  const [pageViews, setPageViews] = useState(0)
  const [ctr, setCtr] = useState(0)
  const [cpc, setCpc] = useState(0)
  const [revenue, setRevenue] = useState(0)

  const calculateRevenue = () => {
    // 클릭률은 퍼센트이므로 100으로 나누어 실제 비율을 계산
    const calculatedRevenue = pageViews * (ctr / 100) * cpc
    setRevenue(calculatedRevenue.toFixed(2))
  }

  return (
    <>
      <CustomSEOContent category={category} />
      <CustomH1Content category={category} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <label htmlFor="pageViews" className="block mb-1">
            페이지뷰 (Page Views):
          </label>
          <input
            type="number"
            id="pageViews"
            value={pageViews}
            onChange={(e) => setPageViews(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ctr" className="block mb-1">
            클릭률 (CTR) (%):
          </label>
          <input
            type="number"
            id="ctr"
            value={ctr}
            onChange={(e) => setCtr(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cpc" className="block mb-1">
            클릭당 비용 (CPC) ($):
          </label>
          <input
            type="number"
            id="cpc"
            value={cpc}
            onChange={(e) => setCpc(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <button
          onClick={calculateRevenue}
          className="bg-blue-500 text-white p-2 rounded"
        >
          수익 계산하기 (Calculate Revenue)
        </button>
        <div className="mt-4">
          <p>예상 수익 (Estimated Revenue): ${revenue}</p>
        </div>
      </div>

      <CustomContent category={category} />
    </>
  )
}
