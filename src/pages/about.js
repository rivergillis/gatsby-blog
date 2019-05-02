import React from "react"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
  <Layout>
    <SEO title="About" keywords={[`about`, `contact`, `me`, `river`]} />
    <h1>About me</h1>
    <p>
      Hey there, it looks like you’ve found my blog! I’m a software engineer
      with experience in systems engineering, graphics, and full-stack web
      development. Right now I’m graduating from the University of Arkansas.
      Pretty soon I'll be working on something fun at Google. Here’s a picture
      of me so that you know that I am a real person:
      <img
        src="/assets/meirl.jpg"
        alt="River's face with a camera obscuring it"
        css={css`
          display: block;
          margin: auto;
          padding-top: 1em;
          width: 70%;
        `}
      />
    </p>
    <p>Close enough.</p>
    <p>
      I also enjoy photography and other creative stuff. Maybe one day I’ll post
      those artifacts here. Don’t count on it though, this blog will mostly be
      used for my great opinions and occasionally things I’ve learned about
      software development.
    </p>
    <p>
      If you want to <b>contact me</b>, you can shoot me an email{" "}
      <a href="mailto:jrivergillis@gmail.com">here</a>, find me on LinkedIn{" "}
      <a href="https://www.linkedin.com/in/rivergillis/">here</a>, or find my
      Twitter <a href="https://twitter.com/rivergillis">here</a>.
    </p>
    <p>
      If you're looking for rstftc, you can find it{" "}
      <a href="/rstftcv1.zip">here</a>.
    </p>
  </Layout>
)
