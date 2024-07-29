import { Flex } from '@radix-ui/themes'
import SearchComponent from '@/components/SearchComponent'
import { PopularCard } from '@/components/cards/PopularCard'
import { RecentCommentsCard } from '@/components/cards/RecentCommentsCard'
import { NewsletterCard } from '@/components/cards/NewsletterCard'

import ResponsiveAd from '@/components/adsense/ResponsiveAd'
import { RightSideWithCard_dataAdSlot } from '@/constants/adsense/data_ad_slot'

export default function RightSideWithCard() {
  return (
    <Flex maxWidth={{ initial: '100%', lg: '344px' }}>
      <aside className="grow lg:px-8">
        <div className="hidden xl:block">
          <SearchComponent />
        </div>
        <div className="pb-[100px]"></div>
        <PopularCard />
        <div className="pb-[30px]"></div>
        <ResponsiveAd
          data_ad_slot={RightSideWithCard_dataAdSlot[0].dataAdSlot}
        />
        <div className="pb-[30px]"></div>
        <RecentCommentsCard />
        <div className="pb-[30px]"></div>

        <ResponsiveAd
          data_ad_slot={RightSideWithCard_dataAdSlot[1].dataAdSlot}
        />
        <div className="pb-[30px]"></div>

        <NewsletterCard />
        <div className="pb-[30px]"></div>

        <ResponsiveAd
          data_ad_slot={RightSideWithCard_dataAdSlot[2].dataAdSlot}
        />
      </aside>
    </Flex>
  )
}
