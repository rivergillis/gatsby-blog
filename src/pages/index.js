import React from "react"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/core"
import PostItem from "../components/post-item"
import FeaturedProjectItem from "../components/featured-project-item"
import Layout from "../layouts/layout"
import SEO from "../components/seo"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(
      edge =>
        !!edge.node.frontmatter.date &&
        edge.node.fields.collection === "markdown-blog"
    )
    .map(edge => <PostItem key={edge.node.id} post={edge.node} />)

  const FeaturedProjects = edges
    .filter(
      edge =>
        !!edge.node.frontmatter.date &&
        edge.node.fields.collection === "markdown-project"
    )
    .slice(0, 3) // only want 3 most recent
    .map(edge => <FeaturedProjectItem key={edge.node.id} project={edge.node} />)

  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[
          `blog`,
          `index`,
          `list`,
          `software`,
          `projects`,
          `code`,
          `engineering`,
        ]}
      />
      <p>
        Hey you've found my site! I write about software and whatever else comes
        to mind. Below are some{" "}
        <b>
          featured <Link to="/projects/">projects</Link>
        </b>
        , followed by the latest <b>blog posts</b>.
      </p>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          justify-content: center;
          align-content: center;
        `}
      >
        {FeaturedProjects}
      </div>
      <hr />
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
            collection
          }
        }
      }
    }
  }
`
