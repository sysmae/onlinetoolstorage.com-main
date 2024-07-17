// _app.jsx
import '@radix-ui/themes/styles.css'
import '../styles/globals.css'

import { Theme, Container, Flex } from '@radix-ui/themes'

import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdsenseScript from '@/components/adsense/AdsenseScript'

import { CardDemo } from '@/components/Card'
import SearchComponent from '@/components/SearchComponent'
import { Separator } from '@/components/ui/separator'

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

function Layout({ children }) {
  return (
    <Theme>
      <Header />
      <div className="pb-[100px]"></div>

      <Flex
        direction={{ initial: 'column', lg: 'row' }}
        className="mx-auto"
        maxWidth={{ lg: '1440px' }}
        justify="between"
      >
        <MainContent>{children}</MainContent>
        <RightSideWithCard />
      </Flex>

      <div className="flex justify-center items-center">
        <Separator className="my-8 w-[1360px]" />
      </div>

      <Flex
        px={{ lg: '40px' }}
        direction={{ initial: 'column', lg: 'row' }}
        className="mx-auto"
        maxWidth={{ lg: '1440px' }}
        justify="between"
      >
        <CardDemo />
        <CardDemo />
        <CardDemo />
      </Flex>

      <div className="flex justify-center items-center">
        <Separator className="my-8 w-[1360px]" />
      </div>

      <Footer />
    </Theme>
  )
}

function MainContent({ children }) {
  return (
    <Container maxWidth={{ lg: '960px' }} px={{ lg: '40px' }}>
      <main>{children}</main>
    </Container>
  )
}

function RightSideWithCard() {
  return (
    <Flex maxWidth={{ lg: '480px' }} px={{ lg: '40px' }}>
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
