import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import Header from "./header"

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div
      id="outer-container"
      css={css`
        margin: 3rem auto;
        max-width: 650px;
        padding-left: 1.3em;
        padding-right: 1.3em;
      `}
    >
      <Header data={data} />
      {children}
    </div>
  )
}
