// _app.jsx
import '@radix-ui/themes/styles.css'
import '../styles/globals.css'

import { Theme, Container, Flex } from '@radix-ui/themes'

import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'
import { SpeedInsights } from '@vercel/speed-insights/next'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Giscus from '@/components/Giscus'

import AdsenseScript from '@/components/adsense/AdsenseScript'

import { Separator } from '@/components/ui/separator'

import RightSideWithCard from '@/components/RightSideWithCard'
import SearchComponent from '@/components/SearchComponent'
import { CarouselSize } from '@/components/Carousel'

function MyApp({ Component, pageProps }) {
  return (
    <AppContent>
      <Component {...pageProps} />
      <SpeedInsights />
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

function CustomFlex({ children, ...props }) {
  return (
    <Flex
      direction={{ initial: 'column', lg: 'row' }}
      className="mx-auto"
      maxWidth={{ initial: '100%', lg: '1200px' }}
      justify="between"
      {...props}
    >
      {children}
    </Flex>
  )
}

function CenteredSeparator() {
  return (
    <div className="flex items-center justify-center">
      <Separator className="my-8 max-w-screen-xl" />
    </div>
  )
}

function Layout({ children }) {
  return (
    <Theme>
      <Header />
      <div className="pb-[25px] xl:pb-[50px]"></div>
      <div className="block xl:hidden">
        <SearchComponent />
      </div>
      <div className="pb-[50px] xl:hidden"></div>

      <CustomFlex>
        <MainContent>{children}</MainContent>
        <RightSideWithCard />
      </CustomFlex>

      <CenteredSeparator />

      <CarouselSize />

      <CenteredSeparator />
      <div className="mx-auto lg:max-w-screen-xl " id="comments">
        <p className="bg-violet-200 text-center text-lg font-bold text-gray-900 dark:bg-gray-700 dark:text-gray-300">
          개발자에게 건의(훈수)하기
        </p>
        <p className="bg-violet-200 text-center text-gray-900 dark:bg-gray-700 dark:text-gray-300">
          Communicate With Developer
        </p>
        <Giscus />
      </div>
      <Footer />
    </Theme>
  )
}

function MainContent({ children }) {
  return (
    <Container
      maxWidth={{ initial: '100%', lg: '768px' }}
      px={{ initial: '15px', lg: '30px' }}
      className="rounded-lg bg-violet-100 p-8 dark:bg-gray-700"
    >
      <main>{children}</main>
    </Container>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
