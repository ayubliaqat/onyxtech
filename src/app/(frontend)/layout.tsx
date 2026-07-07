import type { Metadata } from 'next'
import { OrganizationJsonLd } from '@/components/SEO/OrganizationJsonLd'
import './styles.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://onyxtech.com'), // TODO: replace with real domain
  title: {
    default: 'OnyxTech — Premium Electronics Accessories',
    template: '%s | OnyxTech',
  },
  description:
    'Precision-engineered chargers, cables, cases, and power banks designed to disappear into your everyday carry.',
  keywords: ['AirPods case', 'chargers', 'cables', 'power banks', 'electronics accessories'],
  openGraph: {
    type: 'website',
    siteName: 'OnyxTech',
    title: 'OnyxTech — Premium Electronics Accessories',
    description:
      'Precision-engineered chargers, cables, cases, and power banks designed to disappear into your everyday carry.',
    url: 'https://onyxtech.com', // TODO: replace
    images: [
      {
        url: '/og-image.jpg', // TODO: add a real 1200x630 image to /public
        width: 1200,
        height: 630,
        alt: 'OnyxTech premium electronics accessories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OnyxTech — Premium Electronics Accessories',
    description:
      'Precision-engineered chargers, cables, cases, and power banks designed to disappear into your everyday carry.',
    images: ['/og-image.jpg'], // TODO
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  )
}
