import React from 'react'

import Script from 'next/script'
import Footer from '@/components/Footer'
import HeaderWithSideBar from '@/components/HeaderWithSideBar'

import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'

import ResponsiveAd from '@/components/adsense/ResponsiveAd'
import { SideContentVerticalResponsive_dataAdSlot } from '@/constants/adsense/data_ad_slot'

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
//         <HeaderWithSideBar />
//         {/* <main className="lg:ml-36 mr-0 lg:mr-32 lg:px-32 lg:pr-0 main-lg-width break-words"> */}
//         {/* <main className="main-lg-width break-words">{children}</main> */}
//         <main>{children}</main>
//       </div>
//       <Footer />
//     </div>
//   )
// }

function Layout({ children }) {
  return (
    <div className="mx-auto min-h-screen bg-transparent">
      {/* Header with logo and navigation bar */}
      <HeaderWithSideBar />
      {/* Main content area */}
      <div className="flex flex-col pt-16 lg:flex-row gap-4 p-4">
        {/* Article content area */}
        <main className=" max-w-7xl p-4 relative">{children}</main>
        {/* Sidebar ad unit */}
        <aside className="sidebar min-w-5xl p-4 w-1/4">
          <ResponsiveAd
            data_ad_slot={
              SideContentVerticalResponsive_dataAdSlot[0].dataAdSlot
            }
          />
          <div className="pb-4 bg-transparent"></div>
          <ResponsiveAd
            data_ad_slot={
              SideContentVerticalResponsive_dataAdSlot[1].dataAdSlot
            }
          />
          <div className="pb-4 bg-transparent"></div>
          <ResponsiveAd
            data_ad_slot={
              SideContentVerticalResponsive_dataAdSlot[1].dataAdSlot
            }
          />
          <div className="pb-4 bg-transparent"></div>
          <ResponsiveAd
            data_ad_slot={
              SideContentVerticalResponsive_dataAdSlot[1].dataAdSlot
            }
          />
          <div className="pb-4 bg-transparent"></div>
        </aside>
      </div>
      <Footer />
    </div>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
