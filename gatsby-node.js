const path = require('path')

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: 'contents',
      trailingSlash: false
    })
    createNodeField({
      node,
      name: 'path',
      value: `/posts${relativeFilePath}`
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const postTemplate = path.resolve(`src/templates/post.tsx`)

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            fields {
              path
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.path,
      component: postTemplate,
      context: {} // additional data can be passed via context
    })
  })
}
