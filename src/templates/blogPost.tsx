import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Comment from '../components/comment'
import { Divider, HStack, Tag, Text } from '@chakra-ui/react'
import './theme.css'
import Markdown from './markdown'
import { useTranslation } from 'react-i18next'
import TableOfContents from './tableOfContents'

type Props = {
  data: any
}

export default function BlogPost({ data }: Props): JSX.Element {
  const {
    markdownRemark: {
      fields: { category },
      frontmatter: { title, date },
      html,
      tableOfContents,
    },
  } = data
  const { t } = useTranslation()

  return (
    <Layout title={title} right={<TableOfContents html={tableOfContents} />}>
      <main>
        <article>
          <div>
            <header>
              <HStack>
                <Tag size="lg">{t(`category.${category}`)}</Tag>
                <Text>{date}</Text>
              </HStack>
            </header>
            <Divider marginY="36px" />
            <Markdown dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </article>
        <Comment />
      </main>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents
      fields {
        slug
        category
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`
