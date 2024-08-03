import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Newsletter from '@/components/Newsletter'
import { useRouter } from 'next/router'

export function NewsletterCard({ className, ...props }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()
  const { locale } = router

  useEffect(() => {
    if (locale === 'en') {
      setTitle('✉️ Newsletter Subscription')
      setDescription(
        'Subscribe to our newsletter to get the latest tool and updates.',
      )
    }
    if (locale === 'ko') {
      setTitle('✉️ 뉴스레터 구독')
      setDescription('최신 툴 및 업데이트를 받으려면 뉴스레터를 구독하세요.')
    }
  }, [locale])

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Newsletter />
      </CardContent>
    </Card>
  )
}
