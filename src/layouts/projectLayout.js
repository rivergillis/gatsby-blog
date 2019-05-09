// This ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faCalendarDay,
  faStroopwafel,
  faClock,
  faBars,
} from "@fortawesome/free-solid-svg-icons"

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import "./layout.css"
import Header from "../components/header"
import Footer from "../components/footer"

// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false
// add to fa lib
library.add([faCalendarDay, faStroopwafel, faClock, faBars])

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
        max-width: 900px;
        padding-left: 1.3em;
        padding-right: 1.3em;
      `}
    >
      <Header data={data} />
      {children}
      <Footer />
    </div>
  )
}
