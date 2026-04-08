import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Discover from './pages/protectedPages/discover/Discover'
import Home from './pages/home/Home'
import MixDetails from './pages/protectedPages/mixDetails/MixDetails'
import MainLayout from "./components/layout/MainLayout"
import { NotificationProvider } from "@/context/NotificationContext"

function App() {
  return (
    <NotificationProvider>

      <Routes>

        {/* pages WITHOUT header */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* pages WITH header */}
        <Route element={<MainLayout />}>

          <Route
            path="/discover"
            element={
              <ProtectedRoute>
                <Discover />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mix/:dj/:track"
            element={
              <ProtectedRoute>
                <MixDetails />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>

    </NotificationProvider>
  )
}

export default App