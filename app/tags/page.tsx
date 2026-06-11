import { getAllTags } from '@/lib/cosmic'
import TagCard from '@/components/TagCard'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Tags | gochu boudai's Project",
  description: 'Browse content by tag',
}

export default async function TagsPage() {
  const tags = await getAllTags()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Tags</h1>
        <p className="mt-3 text-lg text-gray-600">
          Browse all available content tags.
        </p>
      </header>

      {tags.length === 0 ? (
        <p className="text-gray-500">No tags found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tags.map((tag) => (
            <TagCard key={tag.id} tag={tag} />
          ))}
        </div>
      )}
    </div>
  )
}