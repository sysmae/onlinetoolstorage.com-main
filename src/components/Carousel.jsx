import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { CarouselCard } from './cards/CarouselCard'
import { Card, CardContent } from '@/components/ui/card'
import Autoplay from 'embla-carousel-autoplay'
import { useTranslation } from 'next-i18next'

export function CarouselSize() {
  const { t } = useTranslation('common')
  const cards = t('carousel.cards', { returnObjects: true }) // 다국어 지원을 위해 carousel 배열 가져오기
  // console.log('card', cards)

  const validCards = Array.isArray(cards) ? cards : []

  // console.log('validCards', validCards)

  const plugin = React.useRef(Autoplay({ delay: 2000 }))

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[plugin.current]}
      className="mx-auto max-w-md bg-slate-500 lg:max-w-6xl"
    >
      {/* <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

  */}
      <CarouselContent>
        {validCards.map((card, index) => {
          // console.log('card', card)
          return (
            <CarouselItem
              key={index}
              className="w-full items-center justify-center bg-slate-400 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <CarouselCard
                  className="flex aspect-square items-center justify-center"
                  title={card.title}
                  description={card.description}
                  href={card.href}
                  image={card.image}
                />
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  )
}

export default CarouselSize
