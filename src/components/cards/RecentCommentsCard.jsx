import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/router'

export function RecentCommentsCard({ className, ...props }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('Recent Comments')

  const router = useRouter()
  const { locale } = router

  useEffect(() => {
    if (locale === 'en') {
      setTitle('Recent Comments')
    }
    if (locale === 'ko') {
      setTitle('최근 댓글')
    }

    async function fetchComments() {
      try {
        const response = await fetch('/api/getRecentComments')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log('data', data)

        // Extract comments from discussions
        const allComments = data.discussions.flatMap((discussion) =>
          discussion.comments.edges.map((edge) => ({
            ...edge.node,
            title: discussion.title === 'index' ? '/' : discussion.title, // Update title if necessary
          })),
        )

        // Sort comments by createdAt date in descending order and limit to 5
        const recentComments = allComments
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)

        setComments(recentComments)
      } catch (error) {
        console.error('Error fetching comments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()

    // Set up interval for refetching comments every 5 minutes
    const intervalId = setInterval(() => fetchComments(), 5 * 60 * 1000) // 5 minutes

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId)
  }, [locale])

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {loading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments available</p>
        ) : (
          comments.map((comment) => (
            <Link href={`/${comment.title}#comments`} key={comment.id} passHref>
              <div className="p-1 border rounded-lg hover:bg-gray-100 transition">
                <p className="text-sm">
                  <strong>{comment.author.login}</strong> at{' '}
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                <p className="text-sm">{comment.body}</p>
                <hr />
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  )
}
