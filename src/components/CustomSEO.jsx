import { NextSeo, WebPageJsonLd } from 'next-seo'
import useLocalizedPage from '@/hooks/useLocalizedPage'

function CustomSEOContent({ category }) {
  const { seoData } = useLocalizedPage(category)

  return (
    <div>
      <NextSeo
        title={seoData.title}
        description={seoData.description}
        canonical={seoData.url}
        openGraph={{
          url: seoData.url,
          title: seoData.title,
          description: seoData.description,
          images: [
            {
              // url: seoData.image,
              width: 800,
              height: 600,
              alt: seoData.title,
            },
          ],
          site_name: '온라인 툴 모음 | 온툴모',
        }}
      />
      <WebPageJsonLd
        name={seoData.title}
        description={seoData.description}
        url={seoData.url}
        potentialAction={{
          '@type': 'SearchAction',
          target: `${seoData.url}?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        }}
      />
    </div>
  )
}

export default CustomSEOContent
