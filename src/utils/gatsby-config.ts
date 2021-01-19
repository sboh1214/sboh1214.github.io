const meta = {
  title: '오승빈(Seungbin Oh)',
  description: '오승빈(Seungbin Oh)의 개인 사이트',
  author: '오승빈(Seungbin Oh)',
  siteUrl: 'https://sboh.dev',
  lang: 'ko',
  utterances: 'sboh1214/sboh.dev',
  icon: 'src/images/icon.png',
}

export const siteMetadata = {
  title: meta.title,
  description: meta.description,
  author: meta.author,
  siteUrl: meta.siteUrl,
  lang: meta.lang,
  utterances: {
    repo: meta.utterances,
  },
}

export const plugins = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'contents',
      path: `${__dirname}/../../contents`,
    },
  },
  'gatsby-plugin-sharp',
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 800,
          },
        },
        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            showLineNumbers: true,
          },
        },
        {
          resolve: 'gatsby-remark-autolink-headers',
          options: {
            className: 'anchor-header',
            elements: ['h2', 'h3', 'h4'],
          },
        },
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: meta.title,
      short_name: meta.title,
      description: meta.description,
      lang: meta.lang,
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      display: 'standalone',
      icon: meta.icon,
      icon_options: {
        purpose: 'any maskable',
      },
    },
  },
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      host: meta.siteUrl,
      sitemap: `${meta.siteUrl}/sitemap.xml`,
      policy: [{ userAgent: '*', disallow: '' }],
    },
  },
  {
    resolve: 'gatsby-plugin-canonical-urls',
    options: {
      siteUrl: 'https://sboh.dev',
    },
  },
  {
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: 'GTM-KGLH85S',
    },
  },
  '@chakra-ui/gatsby-plugin',
  'gatsby-plugin-offline',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-feed',
  'gatsby-plugin-remove-trailing-slashes',
]
