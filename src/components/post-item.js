import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PostItem = ({ post }) => (
  <div>
    <Link to={post.fields.slug}>
      <h3
        css={css`
          margin-bottom: ${rhythm(1 / 4)};
        `}
      >
        {post.frontmatter.title}{" "}
      </h3>
      <h5
        css={css`
          color: #666;
          margin-top: 0px;
          margin-bottom: ${rhythm(1 / 4)};
        `}
      >
        <FontAwesomeIcon icon="calendar-day" /> {post.frontmatter.date}
      </h5>
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
