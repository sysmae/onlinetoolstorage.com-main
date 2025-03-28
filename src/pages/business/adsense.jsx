import { useState } from 'react'

import CustomSEOContent from '@/components/CustomSEO'
import CustomContent from '@/components/CustomMainContent'
import CustomH1Content from '@/components/CustomH1Content'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const category = 'business'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [category, 'common'])),
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
          <label htmlFor="pageViews" className="mb-1 block">
            페이지뷰 (Page Views):
          </label>
          <Input
            type="number"
            id="pageViews"
            value={pageViews}
            onChange={(e) => setPageViews(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ctr" className="mb-1 block">
            클릭률 (CTR) (%):
          </label>
          <Input
            type="number"
            id="ctr"
            value={ctr}
            onChange={(e) => setCtr(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cpc" className="mb-1 block">
            클릭당 비용 (CPC) ($):
          </label>
          <Input
            type="number"
            id="cpc"
            value={cpc}
            onChange={(e) => setCpc(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <Button
          onClick={calculateRevenue}
          className="rounded bg-blue-500 p-2 text-white"
        >
          수익 계산하기 (Calculate Revenue)
        </Button>
        <div className="mt-4">
          <p>예상 수익 (Estimated Revenue): ${revenue}</p>
        </div>
      </div>

      <CustomContent category={category} />
    </>
  )
}
