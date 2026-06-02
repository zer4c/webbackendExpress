import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/login/Login'
import PantallaTodoList from './screens/PantallaTodoList'
import PantallaDrive from './screens/PantallaDrive'
import './App.css'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/todolist" element={
        <ProtectedRoute>
          <PantallaTodoList />
        </ProtectedRoute>
      } />
      <Route path="/drive" element={
        <ProtectedRoute>
          <PantallaDrive />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App