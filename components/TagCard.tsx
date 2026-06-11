import Link from 'next/link'
import type { Tag } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface TagCardProps {
  tag: Tag
}

export default function TagCard({ tag }: TagCardProps) {
  if (!tag) return null

  const name = getMetafieldValue(tag.metadata?.name) || tag.title
  const description = getMetafieldValue(tag.metadata?.description)

  return (
    <Link
      href={`/tags/${tag.slug}`}
      className="group block bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">🏷️</span>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
          {name}
        </h3>
      </div>
      {description && (
        <p className="text-gray-600 line-clamp-3">{description}</p>
      )}
    </Link>
  )
}