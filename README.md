# gochu boudai's Project

![App Preview](https://imgix.cosmicjs.com/a67f9be0-653c-11f1-8e52-17b2565830aa-autopilot-photo-1499750310107-5fef28a66643-1781144659040.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, and fully responsive website powered by [Cosmic](https://www.cosmicjs.com). This application dynamically renders content pages and tag-based browsing using your existing Cosmic content structure.

## Features

- 🎨 Modern, responsive design built with Tailwind CSS
- 📄 Dynamic pages rendered from your Cosmic "Pages" content
- 🏷️ Tag-based content organization and browsing
- 🖼️ Optimized images via imgix
- ⚡ Fast server-rendered pages with Next.js 16 App Router
- 🔍 SEO-friendly structure with proper metadata
- 📱 Mobile-first, accessible UI

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a2a1c3349300d631bf34f3b&clone_repository=6a2a1cd349300d631bf34f5f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: test"

### Code Generation Prompt

> Build a Next.js application for a website called "gochu boudai's Project". The content is managed in Cosmic CMS with the following object types: pages, tags. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: test

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic SDK](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing `pages` and `tags` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables (these are automatically provided in the Cosmic dashboard):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all pages
const { objects: pages } = await cosmic.objects
  .find({ type: 'pages' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single page by slug
const { object: page } = await cosmic.objects
  .findOne({ type: 'pages', slug: 'about' })
  .depth(1)

// Fetch all tags
const { objects: tags } = await cosmic.objects
  .find({ type: 'tags' })
  .props(['id', 'slug', 'title', 'metadata'])
```

## Cosmic CMS Integration

This application uses two object types from your Cosmic bucket:

- **Pages** (`pages`): Content pages with `headline`, `body`, `featured_image`, and `tag` metafields.
- **Tags** (`tags`): Tags with `name` and `description` metafields used to organize pages.

Content is fetched server-side using the Cosmic SDK with the `depth` parameter to resolve connected objects (like a page's tag). Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)

1. Push your code to a Git repository
2. Import the project in [Vercel](https://vercel.com)
3. Add your environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy

### Netlify

1. Push your code to a Git repository
2. Import the project in [Netlify](https://netlify.com)
3. Add your environment variables
4. Deploy

<!-- README_END -->