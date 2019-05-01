import React, { Component } from "react"
import { slide as Menu } from "react-burger-menu"

// This is broken :(

const burgerStyle = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "36px",
    top: "36px",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
}

class MenuWrap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const sideChanged =
      this.props.children.props.right !== nextProps.children.props.right

    if (sideChanged) {
      this.setState({ hidden: true })

      setTimeout(() => {
        this.show()
      }, this.props.wait)
    }
  }

  show() {
    this.setState({ hidden: false })
  }

  render() {
    let style

    if (this.state.hidden) {
      style = { display: "none" }
    }

    return (
      <div style={style} className={this.props.side}>
        {this.props.children}
      </div>
    )
  }
}

class Burger extends Component {
  showSettings(event) {
    event.preventDefault()
  }

  render() {
    return (
      <MenuWrap wait={20} side="right">
        <Menu
          style={burgerStyle}
          outerContainerId={"outer-container"}
          right={false}
        >
          <a id="home" className="menu-item" href="/">
            Home
          </a>
          <a id="about" className="menu-item" href="/about">
            About
          </a>
          <a id="contact" className="menu-item" href="/contact">
            Contact
          </a>
        </Menu>
      </MenuWrap>
    )
  }
}
export default Burger
