// _app.jsx
import '@radix-ui/themes/styles.css'
import '../styles/globals.css'

import { Theme, Container, Flex } from '@radix-ui/themes'

import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../../next-i18next.config'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdsenseScript from '@/components/adsense/AdsenseScript'
import MailChimpScript from '../components/MailChimpScript'
import Giscus from '@/components/Giscus'
// import GiscusScript from '@/components/GiscusScript'

import RightSideWithCard from '@/components/RightSideWithCard'
import { CardDemo } from '@/components/Card'
import SearchComponent from '@/components/SearchComponent'
import { Separator } from '@/components/ui/separator'

import { CarouselSize } from '@/components/Carousel'

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
      <MailChimpScript />
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
    <div className="flex justify-center items-center">
      <Separator className="my-8 max-w-[1280px]" />
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

      <CarouselSize />

      <CenteredSeparator />
      <div className="lg:max-w-[1280px] mx-auto" id="comments">
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
    >
      <main>{children}</main>
    </Container>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
