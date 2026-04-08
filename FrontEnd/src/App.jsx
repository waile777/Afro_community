import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Discover from './pages/protectedPages/discover/Discover'
import Home from './pages/home/Home'
import Upload from './pages/uploadPage/upload'
function App() {
  return (
    <NotificationProvider>

      <Routes>

        {/* pages WITHOUT header */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/discover" element={
          <ProtectedRoute>
            <Discover />
          </ProtectedRoute>
        } />
        <Route path='/upload' element={<Upload/>}/>
      </Routes>

    </NotificationProvider>
  )
}

export default App