import React, { Component } from "react"
import { Link } from "gatsby"

import { css } from "@emotion/core"
import MenuBurger from "./menu-burger"

const ListLink = props => (
  <li
    css={css`
      display: inline-block;
      margin-right: 1rem;
    `}
  >
    <Link to={props.to}>{props.children}</Link>
  </li>
)

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 900,
    }
  }

  componentDidMount() {
    this.handleWindowSizeChange() // Set width
    window.addEventListener("resize", this.handleWindowSizeChange)
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  render() {
    return (
      <header
        css={css`
          margin-bottom: 2rem;
        `}
      >
        <Link
          to="/"
          css={css`
            text-shadow: none;
            background-image: none;
          `}
        >
          <h3
            css={css`
              display: inline;
            `}
          >
            {this.props.data.site.siteMetadata.title}
          </h3>
        </Link>

        {this.state.width >= 650 && (
          <ul
            css={css`
              list-style: none;
              float: right;
            `}
          >
            <ListLink to="/">Blog</ListLink>
            <ListLink to="/about/">About</ListLink>
            <ListLink to="/contact/">Contact</ListLink>
          </ul>
        )}
        {this.state.width < 650 && <MenuBurger />}
      </header>
    )
  }
}

export default Header
