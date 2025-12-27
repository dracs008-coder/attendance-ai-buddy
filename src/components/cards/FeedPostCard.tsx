import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { sanitizeText } from '../../utils/linkUtils'
import type { MouseEvent } from 'react'

interface FeedPost {
  id: string
  technician?: { id: string; name: string }
  title: string
  content: string
  media_url?: string
  media_urls?: string[]
  layout?: { items?: Array<{ url?: string; type?: string; size?: 'sm' | 'md' | 'lg'; order?: number }> }
  liked: boolean
  created_at?: string
}

interface FeedPostCardProps {
  post: FeedPost
  onToggle?: (id: string) => void
}

export default function FeedPostCard({ post, onToggle }: FeedPostCardProps) {
  const mediaLayoutItems = (post.layout && Array.isArray(post.layout.items)
    ? post.layout.items
    : undefined) as any[] | undefined
  const hasLayout = !!(mediaLayoutItems && mediaLayoutItems.length)

  const isVideoUrl = (url: string) => {
    const clean = (url || '').split('?')[0].toLowerCase()
    return clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.ogg')
  }

  const mediaArray = Array.isArray(post.media_urls)
    ? post.media_urls
    : Array.isArray((post as any).mediaUrls)
    ? (post as any).mediaUrls
    : undefined

  const primaryMediaUrl = post.media_url || (mediaArray && mediaArray[0])

  const safeContent = sanitizeText(post.content || '')

  const handleSaveClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!onToggle) return
    e.preventDefault()
    e.stopPropagation()
    onToggle(post.id)
  }

  return (
    <Link
      to={`/posts/${post.id}`}
      className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col cursor-pointer"
    >
      {hasLayout ? (
        <div className="px-4 pt-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {mediaLayoutItems!.map((item: any, index: number) => {
              const fallbackUrl = mediaArray ? mediaArray[index] || mediaArray[0] : post.media_url
              const url = item.url || fallbackUrl
              if (!url) return null
              const size = item.size || 'md'
              const sizeClass =
                size === 'lg' ? 'w-44 h-44' : size === 'sm' ? 'w-20 h-20' : 'w-32 h-32'
              return (
                <div
                  key={index}
                  className={`relative rounded-lg overflow-hidden bg-black flex-shrink-0 ${sizeClass}`}
                >
                  {isVideoUrl(url) ? (
                    <video
                      src={url}
                      className="w-full h-full object-cover object-center"
                      muted
                      loop
                      autoPlay
                    />
                  ) : (
                    <img
                      src={url}
                      alt={post.title}
                      className="w-full h-full object-cover object-center"
                      onError={e => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        primaryMediaUrl && (
          <div className="relative w-full h-48">
            <img
              src={primaryMediaUrl}
              alt={post.title}
              className="w-full h-full object-cover object-center"
              onError={e => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>
        )
      )}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
        <p
          className="text-sm text-gray-700 flex-1 line-clamp-3"
          // In this UI-only build we sanitize text and render as plain text.
        >
          {safeContent}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>by {post.technician?.name ?? 'Unknown'}</span>
          <button
            onClick={handleSaveClick}
            className={`flex items-center space-x-1 ${
              post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
            aria-label="Save post"
          >
            <Heart className="w-4 h-4" />
            <span>{post.liked ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </Link>
  )
}
