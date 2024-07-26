// pages/api/getRecentComments.js
import { Octokit } from '@octokit/rest'

export default async function handler(req, res) {
  const { GITHUB_TOKEN } = process.env

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: 'Missing GitHub token' })
  }

  const octokit = new Octokit({
    auth: GITHUB_TOKEN,
  })

  const query = `
    query {
      repository(owner: "sysmae", name: "OTMComments") {
        discussions(first: 10) {
          edges {
            node {
              id
              title
              comments(first: 10) {
                edges {
                  node {
                    id
                    body
                    createdAt
                    author {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await octokit.graphql(query)
    const discussions = response.repository.discussions.edges

    // Extract the latest comment for each discussion
    const discussionsWithLatestComments = discussions.map((discussion) => {
      const comments = discussion.node.comments.edges
      // Sort comments by createdAt date in descending order
      comments.sort(
        (a, b) => new Date(b.node.createdAt) - new Date(a.node.createdAt),
      )
      return {
        ...discussion.node,
        latestComment: comments, // Get the most recent comment
      }
    })

    res.status(200).json({ discussions: discussionsWithLatestComments })
  } catch (error) {
    console.error('Error fetching comments:', error)
    res.status(500).json({ error: 'Error fetching comments' })
  }
}
