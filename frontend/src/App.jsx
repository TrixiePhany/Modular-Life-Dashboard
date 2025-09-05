import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ToDoList from './pages/ToDo'
import Notes from './pages/Notes'
import SkinCareRoutine from './pages/SkinCareRoutine'

function AppContent() {
  const location = useLocation();

  const hideNavbarRoutes = ['/dashboard', '/todo', '/notes', '/skincare'];


  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todo" element={<ToDoList />} />
        <Route path="/notes" element={<Notes />} />
        <Route path ="/skincare" element={<SkinCareRoutine/>} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
