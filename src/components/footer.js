import React from "react"
import { css } from "@emotion/core"

const Footer = () => (
  <div
    css={css`
      left: 0;
      bottom: 0;
      width: 100%;
      margin-top: 60px;
      text-align: center;
    `}
  >
    <hr
      css={css`
        margin-top: 0px;
        margin-bottom: 20px;
      `}
    />
    <p
      css={css`
        font-size: smaller;
      `}
    >
      This site is a React app built atop{" "}
      <a href="https://www.gatsbyjs.org/">GatsbyJS</a>. Check out the full
      source <a href="https://github.com/rivergillis/gatsby-blog">here</a>.
    </p>
  </div>
)

export default Footer
