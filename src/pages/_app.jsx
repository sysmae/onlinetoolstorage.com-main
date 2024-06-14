import React from 'react'

import Script from 'next/script'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'

import ResponsiveAd from '@/components/adsense/ResponsiveAd'
import {
  LeftSide_dataAdSlot,
  RightSide_dataAdSlot,
  RightSideWithCard_dataAdSlot,
  Top_dataAdSlot,
  Bottom_dataAdSlot,
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
      <Script
        id="adsbygoogle-script"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3670089965415680"
        strategy="lazyOnload"
      ></Script>

      <Script id="gtag-config" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-G3GB4K968L');
        `}
      </Script>
      <Layout>{children}</Layout>
    </>
  )
}

// function Layout({ children }) {
//   return (
//     <div className="mx-auto min-h-screen">
//       <div className="flex flex-col lg:flex-row gap-4 pt-16">
//         <Header />
//         {/* <main className="lg:ml-36 mr-0 lg:mr-32 lg:px-32 lg:pr-0 main-lg-width break-words"> */}
//         <main className="break-words">{children}</main>
//       </div>
//       <Footer />
//     </div>
//   )
// }

function Layout({ children }) {
  return (
    <div className="mx-auto min-h-screen">
      <Header />
      <div className="flex flex-col lg:flex-row gap-4 pt-16">
        <div className="lg:hidden">
          <ResponsiveAd data_ad_slot={Top_dataAdSlot} />
        </div>
        <aside className="hidden lg:block lg:w-2/12 p-4">
          <ResponsiveAd data_ad_slot={LeftSide_dataAdSlot} />
        </aside>
        <main className="w-full lg:w-6/12 break-words p-4">
          <div className="content">{children}</div>
        </main>
        <aside className="w-full lg:w-2/12 p-4">
          <div className="right-side-with-card">
            <ResponsiveAd data_ad_slot={RightSideWithCard_dataAdSlot} />
          </div>
        </aside>
        <aside className="w-full lg:w-2/12 p-4">
          <ResponsiveAd data_ad_slot={RightSide_dataAdSlot} />
        </aside>
      </div>
      <div className="ad-unit-end p-4 text-center">
        <ResponsiveAd data_ad_slot={Bottom_dataAdSlot} />
      </div>
      <Footer />
    </div>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
