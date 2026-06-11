// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Image structure from Cosmic file metafields
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Tag object type
export interface Tag extends CosmicObject {
  type: 'tags';
  metadata: {
    name?: string;
    description?: string;
  };
}

// Page object type
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    headline?: string;
    body?: string;
    featured_image?: CosmicImage;
    tag?: Tag;
  };
}

// API response wrapper
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isPage(obj: CosmicObject): obj is Page {
  return obj.type === 'pages';
}

export function isTag(obj: CosmicObject): obj is Tag {
  return obj.type === 'tags';
}