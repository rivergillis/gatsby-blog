import React from "react"
import Img from "gatsby-image"
import { css } from "@emotion/core"

export default ({ data }) => (
  <div id="about-author">
    <Img
      fixed={data.meirl.childImageSharp.fixed}
      alt="River's face"
      css={css`
        float: left;
        margin-right: 15px;
        width: 180px;
        margin-bottom: 0px;
      `}
    />
    <b>River Gillis</b> is a software engineer with experience in embedded
    systems, graphics, and full-stack web development. He just finished up his
    degree and will soon start work at Google 🎉. You can find him on{" "}
    <a href="https://twitter.com/rivergillis">Twitter</a>,{" "}
    <a href="https://github.com/rivergillis">GitHub</a>,{" "}
    <a href="https://www.instagram.com/therivergillis/">Instagram</a>, and
    probably other places if you look hard enough.
  </div>
)
