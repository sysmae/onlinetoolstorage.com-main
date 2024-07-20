import Link from 'next/link'

export function parseContentLink(content) {
  if (typeof content === 'string') {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g
    let lastIndex = 0
    const result = []

    let match
    while ((match = regex.exec(content)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        result.push(content.slice(lastIndex, match.index))
      }
      // Add the matched link
      const [fullMatch, linkText, url] = match
      result.push(
        <Link
          href={url}
          key={result.length}
          className="text-blue-600 dark:text-blue-400"
        >
          {linkText}
        </Link>,
      )
      lastIndex = regex.lastIndex
    }

    // Add remaining text after the last match
    if (lastIndex < content.length) {
      result.push(content.slice(lastIndex))
    }

    return result
  }
  return content
}
