import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import LiveDataPage from './pages/LiveDataPage/LiveDataPage'
import MapPage from './pages/MapPage/MapPage'
import SensorDetailsPage from './pages/SensorDetailsPage/SensorDetailsPage';

function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/live" replace />} />
        <Route path="live" element={<LiveDataPage />} />
        <Route path="charts/:id" element={<SensorDetailsPage />} />
        <Route path="map" element={<MapPage />} />
      </Route>
    </Routes>


  </>
  )
}

export default App
