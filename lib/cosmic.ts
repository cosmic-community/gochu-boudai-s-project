import { createBucketClient } from '@cosmicjs/sdk'
import type { Page, Tag } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render a metafield value as a string
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Fetch all pages
export async function getAllPages(): Promise<Page[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pages' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Page[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch pages')
  }
}

// Fetch a single page by slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'pages', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const page = response.object as Page
    if (!page) return null
    return page
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch page')
  }
}

// Fetch all tags
export async function getAllTags(): Promise<Tag[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'tags' })
      .props(['id', 'slug', 'title', 'metadata'])
    return response.objects as Tag[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch tags')
  }
}

// Fetch a single tag by slug
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'tags', slug })
      .props(['id', 'slug', 'title', 'metadata'])
    const tag = response.object as Tag
    if (!tag) return null
    return tag
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch tag')
  }
}

// Fetch pages associated with a tag id
export async function getPagesByTagId(tagId: string): Promise<Page[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pages', 'metadata.tag': tagId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Page[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch pages by tag')
  }
}