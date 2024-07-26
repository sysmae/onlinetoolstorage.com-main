import { useTranslation } from 'next-i18next'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

// {
//   title: 'Your call has been confirmed.',
//   description: '1 hour ago',
// },
// {
//   title: 'You have a new message!',
//   description: '1 hour ago',
// },
// {
//   title: 'Your subscription is expiring soon!',
//   description: '2 hours ago',
// },

export function CarouselCard({
  className,
  title,
  description,
  href,
  image,
  ...props
}) {
  return (
    <Card className={className} {...props}>
      <CardContent>
        <Link href={href}>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <Image src={image} alt={title} width={500} height={500} />
        </Link>
      </CardContent>
    </Card>
  )
}
