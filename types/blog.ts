export interface Blog {
    id: number
    slug: string
    title: string
    excerpt: string
    content: string
    tags: string[]
    reading_time: number
    published_at: string
    likes: number
    reactions: Record<string, number>
  }