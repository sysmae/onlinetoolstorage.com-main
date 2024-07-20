import { useTranslation } from 'next-i18next'
import { BellRing, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
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
        <CardDescription>{t('popular.description')}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Push contents</p>
            <p className="text-sm text-muted-foreground">
              Send contents to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {Array.isArray(links) ? (
            links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {link.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
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
