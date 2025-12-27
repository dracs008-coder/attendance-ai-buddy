import { useState, type ChangeEvent } from 'react'
import FeedPostCard from '../cards/FeedPostCard'

// UI-only HomeFeedClient: same layout/behaviour as GigaEase, using
// the already-mocked posts data passed from HomePage.

export default function HomeFeedClient({ posts }: { posts: any[] }) {
  const [postList, setPostList] = useState(posts)
  const [query, setQuery] = useState('')

  const handleToggle = (id: string) => {
    setPostList(prev => prev.map(p => (p.id === id ? { ...p, liked: !p.liked } : p)))
  }

  const filtered = postList.filter(p => {
    const title = (p.title || '').toString().toLowerCase()
    const content = (p.content || '').toString().toLowerCase()
    const q = query.toLowerCase()
    return title.includes(q) || content.includes(q)
  })

  return (
    <div className="mb-12">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search insights..."
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          className="w-full md:max-w-xs border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="flex gap-4 overflow-x-auto overflow-y-hidden no-scrollbar snap-x snap-mandatory flex-nowrap">
        {filtered.map((post: any) => (
          <div key={post.id} className="snap-start w-80 flex-shrink-0">
            <FeedPostCard post={post} onToggle={handleToggle} />
          </div>
        ))}
      </div>
    </div>
  )
}
