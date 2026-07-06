import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Explicit allow-list: standard image formats + 3D model formats
    mimeTypes: ['image/*', 'model/gltf-binary', 'model/gltf+json', 'application/octet-stream'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 600,
        height: 600,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1600, // preserve aspect ratio
      },
    ],
    // Falls back to original if a requested size doesn't apply (e.g. non-image files like .glb)
  },
}
