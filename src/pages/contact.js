import React from "react"
import Layout from "../layouts/layout"
import SEO from "../components/seo"

export default () => (
  <Layout>
    <SEO
      title="About"
      keywords={[
        `about`,
        `contact`,
        `me`,
        `river`,
        `gillis`,
        `engineer`,
        `google`,
      ]}
    />
    <h1>I'd love to chat!</h1>
    <p>
      If you want to <b>contact me</b>, you can shoot me an email{" "}
      <a href="mailto:jrivergillis@gmail.com">here</a>, find me on LinkedIn{" "}
      <a href="https://www.linkedin.com/in/rivergillis/">here</a>, or find my
      Twitter <a href="https://twitter.com/rivergillis">here</a>.
    </p>
  </Layout>
)
