import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Discover from './pages/protectedPages/discover/Discover'
import Home from './pages/home/Home'
import MixDetails from './pages/protectedPages/mixDetails/MixDetails'
import MainLayout from "./components/layout/MainLayout"
import GuestRoute from './components/GuestRoute'
import PublicRoute from './components/PublicRoute'
import Upload from './pages/uploadPage/upload'
import { NotificationProvider } from '@/context/NotificationContext'
function App() {
  return (
    <Routes>

      {/* pages WITHOUT header */}

      <Route path="/" element={
        <PublicRoute>
          <Home />
        </PublicRoute>
      } />
      <Route path="/login" element={
        <GuestRoute>
          <Login />
        </GuestRoute>
      } />
      <Route path="/register" element={
        <GuestRoute>
          <Register />
        </GuestRoute>
      } />

      {/* pages WITH header */}
      <Route element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>

        <Route path="/discover" element={<Discover />} />
        <Route path="/mix/:dj/:track" element={<MixDetails />} />

      </Route>

    </Routes>
  )
}

export default App