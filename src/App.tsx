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
      </Routes>
    </Router>
  )
}


export default App
