import { getAllPages, getAllTags } from '@/lib/cosmic'
import PageCard from '@/components/PageCard'
import TagCard from '@/components/TagCard'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const [pages, tags] = await Promise.all([getAllPages(), getAllTags()])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            gochu boudai&apos;s Project
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-brand-100">
            A modern website powered by Cosmic CMS. Explore our pages and browse
            content by tag.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/tags"
              className="inline-flex items-center px-6 py-3 rounded-full bg-white text-brand-700 font-semibold hover:bg-brand-50 transition-colors"
            >
              Browse Tags
            </Link>
          </div>
        </div>
      </section>

      {/* Pages */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Pages</h2>
        </div>
        {pages.length === 0 ? (
          <p className="text-gray-500">No pages found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <PageCard key={page.id} page={page} />
            ))}
          </div>
        )}
      </section>

      {/* Tags */}
      {tags.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Tags</h2>
            <Link
              href="/tags"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tags.slice(0, 6).map((tag) => (
              <TagCard key={tag.id} tag={tag} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}