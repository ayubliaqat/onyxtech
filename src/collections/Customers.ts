import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: true, // Enables built-in email/password auth, JWT, login/logout endpoints
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'createdAt'],
    // Customers should not clutter the main admin nav alongside staff-facing collections
    group: 'Storefront',
  },
  access: {
    // Customers can only read/update their own record — never each other's
    read: ({ req: { user } }) => {
      if (!user) return false
      return {
        id: {
          equals: user.id,
        },
      }
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      return {
        id: {
          equals: user.id,
        },
      }
    },
    // Only allow creation via public registration (handled by auth), not arbitrary admin creation
    create: () => true,
    delete: () => false,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
    },
    {
      name: 'addresses',
      type: 'array',
      label: 'Saved Addresses',
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'e.g. Home, Work',
          },
        },
        {
          name: 'street',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          required: true,
        },
        {
          name: 'zip',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
        },
        {
          name: 'isDefault',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'wishlist',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: false,
      admin: {
        description: 'Products saved by the customer for later',
      },
    },
    {
      name: 'orders',
      type: 'join',
      collection: 'orders',
      on: 'customer',
      admin: {
        description: 'Read-only reverse lookup — orders placed by this customer',
      },
    },
  ],
}
