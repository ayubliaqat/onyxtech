import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'inStock', 'updatedAt'],
    group: 'Catalog',
  },
  access: {
    read: () => true, // Public storefront needs to read products without auth
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ---------- CONTENT TAB ----------
        {
          label: 'Content',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              unique: true,
              index: true,
              admin: {
                position: 'sidebar',
                description: 'Auto-generated from name, editable if needed',
              },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (value) return value
                    if (data?.name) {
                      return data.name
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '')
                    }
                  },
                ],
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              hasMany: false,
            },
            {
              name: 'brand',
              type: 'text',
              required: false,
            },
          ],
        },
        // ---------- PRICING & INVENTORY TAB ----------
        {
          label: 'Pricing & Inventory',
          fields: [
            {
              name: 'price',
              type: 'number',
              required: true,
              min: 0,
              admin: {
                description: 'Base price in your store currency',
              },
            },
            {
              name: 'compareAtPrice',
              type: 'number',
              required: false,
              min: 0,
              admin: {
                description: 'Original price for showing a strikethrough discount (optional)',
              },
            },
            {
              name: 'sku',
              type: 'text',
              required: false,
              unique: true,
            },
            {
              name: 'stock',
              type: 'number',
              required: true,
              defaultValue: 0,
              min: 0,
            },
            {
              name: 'inStock',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Manual override — turn off to hide "buy" even if stock > 0',
              },
            },
          ],
        },
        // ---------- MEDIA TAB ----------
        {
          label: 'Media',
          fields: [
            {
              name: 'images',
              type: 'array',
              label: 'Product Images',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'model3D',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'GLTF/GLB file for the Three.js product viewer',
              },
            },
            {
              name: 'variants',
              type: 'array',
              label: 'Variants (color / size)',
              required: false,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g. "Midnight Black", "2m"',
                  },
                },
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Color', value: 'color' },
                    { label: 'Size / Length', value: 'size' },
                  ],
                },
                {
                  name: 'priceOverride',
                  type: 'number',
                  required: false,
                  admin: {
                    description: 'Leave blank to use base price',
                  },
                },
                {
                  name: 'stock',
                  type: 'number',
                  required: true,
                  defaultValue: 0,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                },
              ],
            },
          ],
        },
        // ---------- SPECS TAB ----------
        {
          label: 'Specs',
          fields: [
            {
              name: 'specs',
              type: 'array',
              label: 'Specifications',
              fields: [
                {
                  name: 'key',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g. "Material", "Length", "Bluetooth Version"',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
