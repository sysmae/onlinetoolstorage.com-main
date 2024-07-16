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

function Layout({ children }) {
  return (
    <Theme>
      <Header />
      <div className="pb-[100px]"></div>
      <Grid
        columns={{ md: '1', lg: '3' }}
        // rows={{ md: 'auto', lg: '2' }}
        mx={{ lg: '7' }}
        style={{ padding: 'auto' }}
      >
        <MainContent>{children}</MainContent>
        <RightSideWithCard />
        {/* 
        <Container
          px={{ lg: '40px' }}
          width={{ lg: '100%' }}
          gridColumn={{ lg: '1 / -1' }}
          gridRowStart={{ lg: '2' }}
          gridRow={{ lg: '2' }}
        >
          <Flex flexGrow="1" justify="between">
            <CardDemo />
            <CardDemo />
            <CardDemo />
          </Flex>
        </Container> */}
      </Grid>

      <Footer />
    </Theme>
  )
}

function MainContent({ children }) {
  return (
    <Container
      maxWidth={{ lg: '768px' }}
      px={{ lg: '40px' }}
      gridColumn={{ lg: '2/3' }}
      gridColumnStart={{ lg: '1' }}
    >
      <main>{children}</main>
    </Container>
  )
}

function RightSideWithCard() {
  return (
    <Container
      maxWidth={{ lg: '344px' }}
      px={{ lg: '40px' }}
      gridColumn={{ lg: '3/3' }}
      gridColumnStart={{ lg: '3' }}
    >
      <aside>
        <SearchComponent />
        <div className="pb-[100px]"></div>

        <CardDemo />
        <ResponsiveAd data_ad_slot={RightSideWithCard_dataAdSlot} />
        <CardDemo />
        <CardDemo />
      </aside>
    </Container>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig)
