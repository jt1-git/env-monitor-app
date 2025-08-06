import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './NavBar.scss'

const NavBar = () => {
  return (
    <header className="navbar">
      <div className="navbar__container">
        <img src={logo} alt="Logo" className="navbar__logo" />
        <nav className="navbar__nav">
          <NavLink
            to="/live"
            className="navbar__link"
            activeClassName="navbar__link--active"
          >
            Live Data
          </NavLink>
          <NavLink
            to="/charts"
            className="navbar__link"
            activeClassName="navbar__link--active"
          >
            Charts
          </NavLink>
          <NavLink
            to="/map"
            className="navbar__link"
            activeClassName="navbar__link--active"
          >
            Map
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
