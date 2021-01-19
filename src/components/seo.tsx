import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import useSiteMetadata from '../utils/useSiteMetadata'
const defaultOpenGraphImage = require('../images/og-default.png')

type Props = {
  description?: string
  meta?: any
  image?: any
  title: string
}

export default function SEO({ description = '', meta = [], image = null, title }: Props): JSX.Element {
  const { t } = useTranslation()
  const site = useSiteMetadata()
  const metaDescription = description || site.siteMetadata.description
  const ogImageUrl = site.siteMetadata.siteUrl + (image || defaultOpenGraphImage)

  return (
    <Helmet
      htmlAttributes={{
        lang: site.siteMetadata.lang,
      }}
      title={title}
      titleTemplate={`%s | ${t('nav.title')}`}
      meta={[
        {
          name: 'charSet',
          content: 'utf-8',
        },
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          property: 'image',
          content: ogImageUrl,
        },
        {
          property: 'og:image',
          content: ogImageUrl,
        },
        {
          property: 'twitter:image',
          content: ogImageUrl,
        },
      ].concat(meta)}
    />
  )
}
