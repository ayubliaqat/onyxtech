export const OrganizationJsonLd = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OnyxTech',
    url: 'https://onyxtech.com', // TODO: replace
    logo: 'https://onyxtech.com/logo.png', // TODO: add real logo path
    description:
      'OnyxTech makes precision-engineered electronics accessories — chargers, cables, cases, and power banks.',
    sameAs: [
      // TODO: add real social profile URLs
      'https://instagram.com/onyxtech',
      'https://twitter.com/onyxtech',
    ],
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
