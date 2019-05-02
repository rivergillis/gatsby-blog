const path = require("path")
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  // Create slugs for each markdown file as they are loaded, and attach them to the nodes.
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    // Get the parent node
    const parent = getNode(_.get(node, "parent"))
    // get the collection from the parent
    const collection = _.get(parent, "sourceInstanceName")

    let slug = `/${node.frontmatter.verb || "and-writes"}${createFilePath({
      node,
      getNode,
    })}`

    // If this is a project, change the slug
    if (collection === "markdown-project") {
      slug = `/projects${createFilePath({
        node,
        getNode,
      })}`
    }

    // console.log(slug)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    // Create a field on this node for the "collection" of the parent
    // NOTE: This is necessary so we can filter `allMarkdownRemark` by
    // `collection` otherwise there is no way to filter for only markdown
    // documents of type `post`.
    createNodeField({
      node,
      name: "collection",
      value: _.get(parent, "sourceInstanceName"),
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
              collection
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
