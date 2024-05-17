import React from 'react'

import Script from 'next/script'
import Footer from '@/components/Footer'
import SideContent from '@/components/SideContent'
import HeaderWithSideBar from '@/components/HeaderWithSideBar'

import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'

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
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXX"
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

function Layout({ children }) {
  return (
    <div className="mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4 pt-16">
        <HeaderWithSideBar />
        {/* <main className="lg:ml-36 mr-0 lg:mr-32 lg:px-32 lg:pr-0 main-lg-width break-words"> */}
        <main className="main-lg-width break-words">{children}</main>
        <SideContent />
      </div>
      <Footer />
    </div>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
