import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.css'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Dashboard from './pages/management/Dashboard'
import Review from './pages/management/Review'
import System from './pages/management/System'
import PartnerApproval from './pages/management/PartnerApproval'
import Province from './pages/management/Province'
import District from './pages/management/District'
import Spot from './pages/management/Spot'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home';
import Services from './pages/Services';
import ThirdpartyDashboard from './pages/thirdparty/Dashboard';
import BranchManagement from './pages/thirdparty/Branch';
import ThirdpartyRatings from './pages/thirdparty/Ratings';
import ThirdpartyPackage from './pages/thirdparty/Package';
import Company from './pages/management/Company';
import SellerPackage from './pages/management/SellerPackage';
import Agency from './pages/management/Agency';
import AgencyService from './pages/management/AgencyService';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* Redirect "/" to "/home" */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/services" element={<Services/>} />

        {/* Protected routes (role = Admin) */}
        <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/seller-packages" element={<SellerPackage />} />
          <Route path="/admin/companies" element={<Company />} />
          <Route path="/admin/reviews" element={<Review />} />
          <Route path="/admin/agency-services" element={<AgencyService />} />
          <Route path="/admin/system-log" element={<System />} />
          <Route path="/admin/agencies" element={<Agency />} />
          <Route path="/admin/partner-approval" element={<PartnerApproval />} />
          <Route path="/admin/provinces" element={<Province />} />
          <Route path="/admin/districts" element={<District />} />
          <Route path="/admin/spots" element={<Spot />} />
        </Route>

                {/* Protected routes (role = Admin) */}
        <Route element={<PrivateRoute allowedRoles={['ThirdParty']} />}>
          <Route path="/third-party/dashboard" element={<ThirdpartyDashboard />} />
          <Route path="/third-party/branches" element={<BranchManagement />} />
          <Route path="/third-party/ratings" element={<ThirdpartyRatings />} />
          <Route path="/third-party/package" element={<ThirdpartyPackage />} />
        </Route>

        {/* Redirect fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App