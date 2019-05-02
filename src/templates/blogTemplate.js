import React from "react"
import { graphql } from "gatsby"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, timeToRead } = markdownRemark
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        keywords={[`software`, `games`, `video`, `graphics`, `travel`]}
      />
      <div className="blog-post-container">
        <div className="blog-post">
          <h1>{frontmatter.title}</h1>
          <h2
            css={css`
              margin-top: ${rhythm(1 / 2)};
            `}
          >
            {frontmatter.date}
          </h2>
          <h6
            css={css`
              margin-top: ${rhythm(1 / 4)};
              color: #666;
            `}
          >
            <AccessTimeIcon
              css={css`
                vertical-align: text-bottom;
              `}
            />{" "}
            {timeToRead} minute read
          </h6>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      <hr />
      <div id="about-author">
        <img
          src="/assets/meirl.jpg"
          alt="River's face"
          css={css`
            float: left;
            margin-right: 15px;
            width: 180px;
          `}
        />
        <b>River Gillis</b> is a software engineer with experience in systems
        engineering, graphics, and full-stack web development. Right now he is
        finishing up his degree before heading to work at Google. You can find
        him on <a href="https://twitter.com/rivergillis">Twitter</a>,{" "}
        <a href="https://github.com/rivergillis">GitHub</a>,{" "}
        <a href="https://www.instagram.com/therivergillis/">Instagram</a>, and
        probably other places if you look hard enough.
      </div>
    </Layout>
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
    }
  }
`
