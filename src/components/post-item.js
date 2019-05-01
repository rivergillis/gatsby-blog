import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

const PostItem = ({ post }) => (
  <div>
    <Link to={post.frontmatter.path}>
      <h3
        css={css`
          margin-bottom: ${rhythm(1 / 4)};
        `}
      >
        {post.frontmatter.title}{" "}
        <span
          css={css`
            color: #bbb;
          `}
        >
          — {post.frontmatter.date}
        </span>
      </h3>
      <p
        css={css`
          color: #171717;
        `}
      >
        {post.excerpt}
      </p>
    </Link>
  </div>
)

export default PostItem
