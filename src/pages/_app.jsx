// _app.jsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdsenseScript from '@/components/adsense/AdsenseScript'
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'

import ResponsiveAd from '@/components/adsense/ResponsiveAd'
import {
  LeftSide_dataAdSlot,
  RightSide_dataAdSlot,
  Bottom_dataAdSlot,
  RightSideWithCard_dataAdSlot,
} from '@/constants/adsense/data_ad_slot'

import '../styles/reset.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppContent>
      <Component {...pageProps} />
    </AppContent>
  )
}

function AppContent({ children }) {
  return (
    <>
      <AdsenseScript />
      {/* 메인 레이아웃 */}
      <Layout>{children}</Layout>
    </>
  )
}

function Layout({ children }) {
  return (
    <div className="mx-auto min-h-screen">
      <Header />
      <div className="flex flex-col lg:flex-row pt-8 gap-4">
        {/* Left Side */}
        <aside className="hidden lg:block lg:w-1/5">
          <ResponsiveAd data_ad_slot={LeftSide_dataAdSlot} />
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-2/5 break-words ">
          <div className="content">{children}</div>
        </main>

        {/* Right Side With Card */}
        <aside className="w-full lg:w-1/5">
          <ResponsiveAd data_ad_slot={RightSideWithCard_dataAdSlot} />
        </aside>

        {/* Right Side */}
        <aside className="w-full lg:w-1/5">
          <ResponsiveAd data_ad_slot={RightSide_dataAdSlot} />
        </aside>
      </div>
      <div className="ad-unit-end text-center">
        <ResponsiveAd data_ad_slot={Bottom_dataAdSlot} />
      </div>
      <Footer />
    </div>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
