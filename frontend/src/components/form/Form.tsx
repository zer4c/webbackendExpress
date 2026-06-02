import { useState } from 'react'
import type { Task } from '../../types/task'
import { toInputDatetimeLocal } from '../../utils/date'
import './Form.css'

interface FormProps {
  task?: Task | null
  onClose: () => void
  onSubmit: (data: Partial<Task>) => void
}

function Form({ task, onClose, onSubmit }: FormProps) {
  const [descripcion, setDescripcion] = useState(task?.descripcion ?? '')
  const [estado, setEstado] = useState(task?.estado ?? 'pendiente')
  const [fechaFinal, setFechaFinal] = useState(toInputDatetimeLocal(task?.fechaFinal))

  const SubmitForm = (e: React.SubmitEvent) => {
    e.preventDefault()
    onSubmit({
      descripcion,
      estado,
      fechaFinal: fechaFinal ? fechaFinal + ':00.000Z' : null,
    })
  }

  return (
    <div className="Form-overlay" onClick={onClose}>
      <div className="Form" onClick={(e) => e.stopPropagation()}>
        <h2>{task ? 'Editar tarea' : 'Nueva tarea'}</h2>
        <form onSubmit={SubmitForm}>
          <label>Descripción</label>
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          <label>Estado</label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
          </select>
          <label>Fecha final</label>
          <input
            type="datetime-local"
            value={fechaFinal}
            onChange={(e) => setFechaFinal(e.target.value)}
          />
          <div className="Form-buttons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form