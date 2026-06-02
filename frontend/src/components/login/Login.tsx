import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Panel from '../panel/Panel'
import { login, signup } from '../../services/authService'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const SubmitLogin = async (e: React.SubmitEvent) => {
    e.preventDefault()
    try {
      const res = await login({ email, password })
      localStorage.setItem('token', res.data.access_token)
      navigate('/todolist')
    } catch {
      setError('Credenciales incorrectas')
    }
  }

  const SubmitSignup = async () => {
    try {
      await signup({ email, password })
      const res = await login({ email, password })
      localStorage.setItem('token', res.data.access_token)
      navigate('/todolist')
    } catch {
      setError('Error al registrar')
    }
  }

  return (
    <div className="Login">
      <Panel>
        <form onSubmit={SubmitLogin}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <span className="error">{error}</span>}
          <div className="buttons">
            <button type="submit">Ingresar</button>
            <button type="button" onClick={SubmitSignup}>Registrarse</button>
          </div>
        </form>
      </Panel>
    </div>
  )
}

export default Login