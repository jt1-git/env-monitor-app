import { Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import './MainLayout.scss'

const MainLayout = () => {
  return (
    <div className="main-layout">
      <NavBar />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
