const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  // Create slugs for each markdown file as they are loaded, and attach them to the nodes.
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    // console.log(node)
    console.log(node.frontmatter.verb || "and-writes")
    // console.log(getNode(node))
    const slug = `/${node.frontmatter.verb || "and-writes"}${createFilePath({
      node,
      getNode,
    })}`
    console.log(slug)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blogTemplate.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              verb
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      console.log(`creating ${node.fields.slug}`)
      createPage({
        path: node.fields.slug,
        component: blogPostTemplate,
        context: { slug: node.fields.slug }, // additional data can be passed via context
      })
    })
  })
}
