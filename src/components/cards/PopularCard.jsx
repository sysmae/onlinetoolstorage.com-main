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

export function PopularCard({ className, ...props }) {
  const { t } = useTranslation('common')
  const links = t('popular.links', { returnObjects: true }) // 다국어 지원을 위해 links 배열 가져오기

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>{t('popular.title')}</CardTitle>
        {/* <CardDescription>{t('popular.description')}</CardDescription> */}
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {Array.isArray(links) ? (
            links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="mb-4  items-start pb-4 last:mb-0 last:pb-0"
              >
                <div className="hover:text-violet-400">
                  <p className="py-1 text-sm font-medium leading-none ">
                    {link.title}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>No links available</p>
          )}
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
