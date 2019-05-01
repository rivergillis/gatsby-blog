import React from "react"
import { Link } from "gatsby"
import styles from "./layout.module.css"

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

// Used for global CSS
export default ({ children }) => (
  <div className={styles.container}>
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <h3>River's Blog</h3>
      </Link>
      <ul className={styles.headerList}>
        <ListLink to="/about/">About</ListLink>
        <ListLink to="/contact/">Contact</ListLink>
      </ul>
    </header>
    {children}
  </div>
)
