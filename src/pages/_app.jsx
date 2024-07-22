// _app.jsx
import '@radix-ui/themes/styles.css'
import '../styles/globals.css'

import { Theme, Container, Flex } from '@radix-ui/themes'

import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdsenseScript from '@/components/adsense/AdsenseScript'

import RightSideWithCard from '@/components/RightSideWithCard'
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
      maxWidth={{ initial: '100vw', lg: '1240px' }}
      justify="between"
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
      <Footer />
    </Theme>
  )
}

function MainContent({ children }) {
  return (
    <Container
      maxWidth={{ initial: '100%', lg: '768px' }}
      px={{ initial: '20px', lg: '40px' }}
    >
      <main>{children}</main>
    </Container>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
