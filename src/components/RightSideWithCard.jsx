import { Flex } from '@radix-ui/themes'
import SearchComponent from '@/components/SearchComponent'
import { PopularCard } from '@/components/cards/PopularCard'
import { RecentCommentsCard } from '@/components/cards/RecentCommentsCard'
import { CardDemo } from '@/components/Card'

import ResponsiveAd from '@/components/adsense/ResponsiveAd'
import { RightSideWithCard_dataAdSlot } from '@/constants/adsense/data_ad_slot'

export default function RightSideWithCard() {
  return (
    <Flex maxWidth={{ initial: '100%', lg: '344px' }}>
      <aside className="flex-grow lg:pl-8">
        <div className="hidden xl:block">
          <SearchComponent />
        </div>
        <div className="pb-[100px]"></div>
        <PopularCard />
        <ResponsiveAd
          data_ad_slot={RightSideWithCard_dataAdSlot[0].dataAdSlot}
        />
        <RecentCommentsCard />
        <ResponsiveAd
          data_ad_slot={RightSideWithCard_dataAdSlot[1].dataAdSlot}
        />
        <CardDemo />
        <ResponsiveAd
          data_ad_slot={RightSideWithCard_dataAdSlot[2].dataAdSlot}
        />
      </aside>
    </Flex>
  )
}
