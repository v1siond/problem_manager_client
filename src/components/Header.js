import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import logo from '../static/images/logo.png'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openMenu: false
    }
  }

  handleResize () {
    if (window.innerWidth > 800 || this.state.openMenu) this.handleMenu()
  }

  handleMenu () {
    if (window.innerWidth < 800) this.setState({openMenu: !this.state.openMenu})
    else this.setState({openMenu: true})
  }

  logOut (handleLogout) {
    localStorage.removeItem('authUserToken')
    handleLogout(false)
  }

  componentDidMount () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  render () {
    return (
      <header className="header">
        { this.state.openMenu && window.innerWidth < 800 && (
          <div className="overlay"  onClick={() => this.handleMenu()}/>
        )}
        <ul className={this.state.openMenu ? "navbar -show" : "navbar"}>
          <li className="logo-container">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="title">Problem manager</h1>
          </li>
          <li className="buttons">
            <Link className="rounded-button -primary" to="/question" title="Add Question">
              <FontAwesomeIcon icon={faPlus} />
              <span>Add Question</span>
            </Link>
            <button className="rounded-button -circle -primary" title="Logout">
              <FontAwesomeIcon icon={faUser} onClick={() => {this.logOut(this.props.handleLogout)}} />
            </button>
          </li>
        </ul>
        <button className="rounded-button -circle -transparent-primary -menu-controller">
          <FontAwesomeIcon icon={faBars} onClick={() => this.handleMenu()} />
        </button>
      </header>
    )
  }
}

export default Header