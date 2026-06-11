import Link from 'next/link'
import type { Page } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface PageCardProps {
  page: Page
}

export default function PageCard({ page }: PageCardProps) {
  if (!page) return null

  const featuredImage = page.metadata?.featured_image
  const headline = getMetafieldValue(page.metadata?.headline) || page.title
  const tag = page.metadata?.tag

  return (
    <Link
      href={`/pages/${page.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300"
    >
      {featuredImage && (
        <div className="aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={page.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        {tag && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wide text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full mb-3">
            {getMetafieldValue(tag.metadata?.name) || tag.title}
          </span>
        )}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
          {page.title}
        </h3>
        {headline && headline !== page.title && (
          <p className="mt-2 text-gray-600 line-clamp-2">{headline}</p>
        )}
      </div>
    </Link>
  )
}