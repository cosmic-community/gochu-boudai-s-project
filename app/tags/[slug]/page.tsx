// app/tags/[slug]/page.tsx
import { getTagBySlug, getPagesByTagId, getMetafieldValue } from '@/lib/cosmic'
import PageCard from '@/components/PageCard'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

interface TagPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = await getTagBySlug(slug)
  if (!tag) {
    return { title: 'Tag Not Found' }
  }
  const name = getMetafieldValue(tag.metadata?.name) || tag.title
  return {
    title: `${name} | gochu boudai's Project`,
    description: getMetafieldValue(tag.metadata?.description) || `Pages tagged ${name}`,
  }
}

export default async function TagDetailPage({ params }: TagPageProps) {
  const { slug } = await params
  const tag = await getTagBySlug(slug)

  if (!tag) {
    notFound()
  }

  const pages = await getPagesByTagId(tag.id)
  const name = getMetafieldValue(tag.metadata?.name) || tag.title
  const description = getMetafieldValue(tag.metadata?.description)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/tags"
        className="text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        &larr; Back to tags
      </Link>

      <header className="mt-6 mb-10">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏷️</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{name}</h1>
        </div>
        {description && (
          <p className="mt-4 text-lg text-gray-600">{description}</p>
        )}
      </header>

      {pages.length === 0 ? (
        <p className="text-gray-500">No pages found for this tag.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
      )}
    </div>
  )
}