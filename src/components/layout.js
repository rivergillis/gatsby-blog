import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import styles from "./layout.module.css"

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

// Used for global CSS
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
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.logoLink}>
          <h3>{data.site.siteMetadata.title}</h3>
        </Link>
        <ul className={styles.headerList}>
          <ListLink to="/about/">About</ListLink>
        </ul>
      </header>
      {children}
    </div>
  )
}
