import React from "react"
import { graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import ProjectLayout from "../layouts/projectLayout"
import SEO from "../components/seo"
import AboutAuthor from "../components/about-author"

export default function ProjectTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, fields } = markdownRemark
  return (
    <ProjectLayout>
      <SEO
        title={frontmatter.title}
        keywords={[
          `software`,
          `games`,
          `video`,
          `graphics`,
          `coding`,
          `arduino`,
          `programming`,
          `project`,
          `workshop`,
        ]}
        slug={fields.slug}
      />
      <div className="blog-post-container">
        <div className="blog-post">
          <h1
            css={css`
              margin-bottom: ${rhythm(1 / 4)};
            `}
          >
            {frontmatter.title}
          </h1>
          <h6
            css={css`
              margin-top: ${rhythm(1 / 4)};
              margin-bottom: ${rhythm(1 / 4)};
              color: #666;
            `}
          >
            <FontAwesomeIcon icon="calendar-day" /> Last updated on{" "}
            {frontmatter.date}
          </h6>
          {/* <h6
            css={css`
              margin-top: ${rhythm(1 / 4)};
              margin-bottom: ${rhythm(1 / 4)};
              color: #666;
            `}
          >
            <FontAwesomeIcon icon="clock" /> {timeToRead} minute read
          </h6> */}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      <hr
        css={css`
          margin-top: 30px;
        `}
      />
      <AboutAuthor data={data} />
      <div
        css={css`
          height: 50px;
        `}
      />
    </ProjectLayout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
      timeToRead
      fields {
        slug
      }
    }
    meirl: file(relativePath: { eq: "meirl.jpg" }) {
      childImageSharp {
        fixed(width: 180) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
