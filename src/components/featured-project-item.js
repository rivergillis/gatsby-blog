import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

const FeaturedProjectItem = ({ project }) => (
  <Link
    to={project.fields.slug}
    css={css`
      text-decoration: none;
      background-image: none;
    `}
  >
    <div
      css={css`
        border-radius: 10px;
        padding-left: 10px;
        padding-right: 5px;
        margin-left: 5px;
        margin-right: 5px;
        min-width: 110px;
        max-width: 189px;
        flex: 1;
        line-height: 70px;
        box-shadow: 0 0 0 1pt black;
        margin-bottom: 20px;
        color: red;
        &:hover {
          box-shadow: 0 0 0 1pt #1e74ff;
        }
        &:hover h4 {
          color: #1e74ff;
        }
      `}
    >
      <h4
        css={css`
          margin-top: 0px;
          display: inline-block;
          vertical-align: middle;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          word-break: break-word;
          line-height: 1em;
          max-height: 4em;
          margin: 0;
          padding: 0;
          // &:hover {
          //   color: #1e74ff;
          // }
        `}
      >
        {project.frontmatter.title}
      </h4>
    </div>{" "}
  </Link>
)

export default FeaturedProjectItem
