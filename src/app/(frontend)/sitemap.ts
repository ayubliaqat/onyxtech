import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const products = await payload.find({
    collection: 'products',
    limit: 1000,
  })

  const productUrls: MetadataRoute.Sitemap = products.docs.map((product: any) => ({
    url: `https://onyxtech.com/products/${product.slug}`, // TODO: confirm domain + slug field name
    lastModified: product.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://onyxtech.com', // TODO
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://onyxtech.com/products',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productUrls,
  ]
}
