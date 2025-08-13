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
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
          >
            Live Data
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
          >
            Map
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
