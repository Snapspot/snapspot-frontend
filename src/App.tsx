import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.css'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import Home from './pages/Home';
import Services from './pages/Services';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />

        {/* Redirect "/" to "/home" */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/services" element={<Services/>} />

        {/* Protected routes (role = Admin) */}
        <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
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
        </Route>

        {/* Redirect fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App