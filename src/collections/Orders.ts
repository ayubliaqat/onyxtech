import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customer', 'status', 'total', 'createdAt'],
    group: 'Storefront',
  },
  access: {
    // Customers can only read their own orders; staff (req.user via Users) can read all
    read: ({ req: { user } }) => {
      if (!user) return false
      // If it's a staff user (Users collection), allow full read
      if (user.collection === 'users') return true
      // If it's a customer, restrict to their own orders
      return {
        customer: {
          equals: user.id,
        },
      }
    },
    // Orders are created via server-side checkout logic, not directly by customers or public
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => {
      if (!user) return false
      return user.collection === 'users' // Only staff can update order status etc.
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.collection === 'users'
    },
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated, e.g. ONX-00001',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (value) return value
            const random = Math.floor(100000 + Math.random() * 900000)
            return `ONX-${random}`
          },
        ],
      },
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'variantLabel',
          type: 'text',
          required: false,
          admin: {
            description: 'e.g. "Midnight Black" — snapshot of the variant chosen, if any',
          },
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          defaultValue: 1,
        },
        {
          name: 'priceAtOrder',
          type: 'number',
          required: true,
          admin: {
            description: 'Snapshot of the price at time of purchase (prices may change later)',
          },
        },
      ],
    },
    {
      name: 'subtotal',
      type: 'number',
      required: true,
    },
    {
      name: 'shipping',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'tax',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
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
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    {
      name: 'paymentStatus',
      type: 'select',
      required: true,
      defaultValue: 'unpaid',
      options: [
        { label: 'Unpaid', value: 'unpaid' },
        { label: 'Paid', value: 'paid' },
        { label: 'Refunded', value: 'refunded' },
      ],
    },
    {
      name: 'stripePaymentIntentId',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
}
