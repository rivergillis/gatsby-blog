import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

const FeaturedProjectItem = ({ project }) => (
  <div
    css={css`
      border-radius: 10px;
      padding: 20px;
      margin-left: 5px;
      margin-right: 5px;
      min-width: 100px;
      max-width: 189px;
      flex: 1;
      line-height: 70px;
      box-shadow: 0 0 0 1pt black;
      margin-bottom: 20px;
    `}
  >
    <Link
      to={project.fields.slug}
      css={css`
        text-decoration: none;
        background-image: none;
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
          &:hover {
            color: #1e74ff;
          }
        `}
      >
        {project.frontmatter.title}
      </h4>
    </Link>
  </div>
)

export default FeaturedProjectItem
