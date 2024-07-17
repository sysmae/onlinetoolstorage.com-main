// _app.jsx
import '@radix-ui/themes/styles.css'
import '../styles/globals.css'

import { Theme, Container, Flex } from '@radix-ui/themes'

import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdsenseScript from '@/components/adsense/AdsenseScript'

import GiscusScript from '@/components/GiscusScript'
import Giscus from '@/components/Giscus'

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
      {/* <GiscusScript /> */}
      {/* 메인 레이아웃 */}
      <Layout>{children}</Layout>
    </>
  )
}

function CustomFlex({ children, ...props }) {
  return (
    <Flex
      direction={{ initial: 'column', lg: 'row' }}
      className="mx-auto"
      maxWidth={{ initial: '100vw', lg: '1440px' }}
      justify="between"
      px={{ initial: '20px', lg: '40px' }}
      {...props}
    >
      {children}
    </Flex>
  )
}

function CenteredSeparator() {
  return (
    <div className="flex justify-center items-center">
      <Separator className="my-8 max-w-[1360px]" />
    </div>
  )
}

function Layout({ children }) {
  return (
    <Theme>
      <Header />
      <div className="pb-[50px] xl:pb-[100px]"></div>
      <div className="block xl:hidden">
        <SearchComponent />
      </div>
      <div className="pb-[50px] xl:hidden"></div>

      <CustomFlex>
        <MainContent>{children}</MainContent>
        <RightSideWithCard />
      </CustomFlex>

      <CenteredSeparator />

      <CustomFlex>
        <CardDemo />
        <CardDemo />
        <CardDemo />
      </CustomFlex>

      <CenteredSeparator />
      {/* <Giscus /> */}
      <Footer />
    </Theme>
  )
}

function MainContent({ children }) {
  return (
    <Container
      maxWidth={{ initial: '100%', lg: '960px' }} // 수정: maxWidth 100%로 변경
    >
      <main>{children}</main>
    </Container>
  )
}

function RightSideWithCard() {
  return (
    <Flex
      maxWidth={{ initial: '100%', lg: '480px' }} // 수정: maxWidth 100%로 변경
    >
      <aside>
        <div className="hidden xl:block">
          <SearchComponent />
        </div>
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
