import React from "react"
import { graphql } from "gatsby"
import PostItem from "../components/post-item"
import Layout from "../components/layout"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostItem key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <p>
        Hey you've found my site! I write about software and whatever else comes
        to mind. Below are the latest <b>blog posts</b>. I'll add my{" "}
        <b>projects</b> in a few days.
      </p>
      <div>{Posts}</div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
