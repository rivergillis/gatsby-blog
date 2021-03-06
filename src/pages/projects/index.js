import React from "react"
import { graphql } from "gatsby"

// import { css } from "@emotion/core"
import Layout from "../../layouts/layout"
import SEO from "../../components/seo"
import PostItem from "../../components/post-item"

const ProjectIndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Projects = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostItem key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <SEO title="Home" keywords={[`blog`, `index`, `list`, `software`]} />
      <h1>Projects</h1>
      <div>{Projects}</div>
    </Layout>
  )
}

export default ProjectIndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "markdown-project" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
