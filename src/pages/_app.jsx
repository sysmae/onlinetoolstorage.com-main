// _app.jsx
import React from 'react'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
      {/* Google Adsense 구글 애드센스*/}
      <Script
        id="adsbygoogle-script"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3670089965415680"
        strategy="afterInteractive"
      ></Script>

      <Script id="gtag-config" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-G3GB4K968L');
  `}
      </Script>
      <Script id="adsbygoogle-push">{`window.adsbygoogle = window.adsbygoogle || [];`}</Script>

      {/* Google Analytics  구글 애널리틱스 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-43FPVB8QN1"
        strategy="afterInteractive"
      ></Script>
      <Script id="GA-script" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-43FPVB8QN1');
  `}
      </Script>

      {/* 메인 레이아웃 */}
      <Layout>{children}</Layout>
    </>
  )
}

function Layout({ children }) {
  return (
    <div className="mx-auto min-h-screen">
      <Header />
      <div className="flex flex-col lg:flex-row pt-8">
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
