// app/pages/[slug]/page.tsx
import { getPageBySlug } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) {
    return { title: 'Page Not Found' }
  }
  return {
    title: `${page.title} | gochu boudai's Project`,
    description: getMetafieldValue(page.metadata?.headline) || page.title,
  }
}

export default async function SinglePage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  const featuredImage = page.metadata?.featured_image
  const headline = getMetafieldValue(page.metadata?.headline)
  const body = getMetafieldValue(page.metadata?.body)
  const tag = page.metadata?.tag

  return (
    <article>
      {featuredImage && (
        <div className="w-full aspect-[21/9] overflow-hidden bg-gray-100">
          <img
            src={`${featuredImage.imgix_url}?w=2400&h=1029&fit=crop&auto=format,compress`}
            alt={page.title}
            width={1200}
            height={514}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          &larr; Back to home
        </Link>

        <header className="mt-6 mb-8">
          {tag && (
            <Link
              href={`/tags/${tag.slug}`}
              className="inline-block text-xs font-semibold uppercase tracking-wide text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full mb-4 hover:bg-brand-100 transition-colors"
            >
              {getMetafieldValue(tag.metadata?.name) || tag.title}
            </Link>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {page.title}
          </h1>
          {headline && (
            <p className="mt-4 text-xl text-gray-600">{headline}</p>
          )}
        </header>

        {body && (
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-brand-600"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}
      </div>
    </article>
  )
}