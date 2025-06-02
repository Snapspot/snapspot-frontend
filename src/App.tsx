import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Blog from './pages/Blog'
import './index.css'
import Dashboard from './pages/management/Dashboard'
import Location from './pages/management/Location'
import Marketing from './pages/management/Marketing'
import Partner from './pages/management/Partner'
import Review from './pages/management/Review'
import Service from './pages/management/Service'
import System from './pages/management/System'
import Member from './pages/management/Member'
import PartnerApproval from './pages/management/PartnerApproval'
import Province from './pages/management/Province'
import District from './pages/management/District'
import Spot from './pages/management/Spot'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/locations" element={<Location />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/partners" element={<Partner />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/services" element={<Service />} />
        <Route path="/system-log" element={<System />} />
        <Route path="/members" element={<Member />} />
        <Route path="/partner-approval" element={<PartnerApproval />} />
        <Route path="/provinces" element={<Province />} />
        <Route path="/districts" element={<District />} />
        <Route path="/spots" element={<Spot />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}


export default App
