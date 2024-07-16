// _app.jsx
import '@radix-ui/themes/styles.css'
import '../styles/globals.css'

import { Grid, Theme, Container, Flex } from '@radix-ui/themes'

import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdsenseScript from '@/components/adsense/AdsenseScript'

import { CardDemo } from '@/components/Card'
import SearchComponent from '@/components/SearchComponent'

import ResponsiveAd from '@/components/adsense/ResponsiveAd'
import {
  LeftSide_dataAdSlot,
  RightSide_dataAdSlot,
  Bottom_dataAdSlot,
  RightSideWithCard_dataAdSlot,
} from '@/constants/adsense/data_ad_slot'

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

function DemoBox() {
  return (
    <div className="bg-gray-100  w-full h-auto border border-slate-900 "></div>
  )
}
function Layout({ children }) {
  return (
    <Theme>
      <Header />
      <div className="pb-[100px]"></div>
      <Flex mx={{ lg: '7' }} style={{ padding: 'auto' }}>
        <MainContent>{children}</MainContent>
        <RightSideWithCard />
      </Flex>

      <Flex px={{ lg: '40px' }} mx={{ lg: '7' }} justify="between">
        <CardDemo />
        <CardDemo />
        <CardDemo />
      </Flex>

      <Footer />
    </Theme>
  )
}

function MainContent({ children }) {
  return (
    <Container maxWidth={{ lg: '848px' }} px={{ lg: '40px' }}>
      <main>{children}</main>
    </Container>
  )
}

function RightSideWithCard() {
  return (
    <Flex maxWidth={{ lg: '424px' }} px={{ lg: '40px' }}>
      <aside>
        <SearchComponent />
        <div className="pb-[100px]"></div>
        <CardDemo />
        <ResponsiveAd data_ad_slot={RightSideWithCard_dataAdSlot} />
        <CardDemo />
        <ResponsiveAd data_ad_slot={RightSideWithCard_dataAdSlot} />
        <CardDemo />
      </aside>
    </Flex>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
