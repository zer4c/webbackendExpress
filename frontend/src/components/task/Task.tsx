import { useState } from 'react'
import type { Task as TaskType } from '../../types/task'
import { TaskState } from '../../types/states'
import Form from '../form/Form'
import { formatDate } from '../../utils/date'
import { deleteItem, patchItem } from '../../services/itemService'
import './Task.css'

interface TaskProps {
  task: TaskType | null
  onRefresh: () => void
  onClearSelection: () => void
}

function Task({ task, onRefresh, onClearSelection }: TaskProps) {
  const [message, setMessage] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  if (!task) return <p className="Task-empty">Selecciona una tarea para ver el detalle.</p>

  const DeleteTask = async () => {
    if (!confirm('¿Está seguro de eliminar esta tarea?')) return
    try {
      await deleteItem(task.id)
      onClearSelection()
      onRefresh()
    } catch {
      setMessage('No se pudo eliminar')
    }
  }

  const UpdateTask = async (data: Partial<TaskType>) => {
    if (!confirm('¿Está seguro de actualizar esta tarea?')) return
    try {
      await patchItem(task.id, data)
      setMessage('Actualizado')
      setShowForm(false)
      onRefresh()
    } catch {
      setMessage('No se pudo actualizar')
    }
  }

  const FinishTask = async () => {
    if (!confirm('¿Marcar esta tarea como completada?')) return
    try {
      await patchItem(task.id, { estado: TaskState.COMPLETADO })
      setMessage('Tarea terminada')
      onRefresh()
    } catch {
      setMessage('No se pudo marcar como finalizado')
    }
  }

  return (
    <div className="Task">
      <h1>Información Tarea</h1>
      <h2>{task.descripcion || 'Sin descripción'}</h2>
      <p><strong>Estado: </strong>{task.estado}</p>
      <p><strong>Fecha de creación: </strong>{formatDate(task.fechaCreacion)}</p>
      <p><strong>Fecha final: </strong>{formatDate(task.fechaFinal)}</p>
      <section className="Options">
        <button onClick={DeleteTask}>Eliminar</button>
        <button onClick={() => setShowForm(true)}>Actualizar</button>
        <button onClick={FinishTask}>Terminar Tarea</button>
      </section>
      {message && <div className="message">{message}</div>}
      {showForm && <Form task={task} onClose={() => setShowForm(false)} onSubmit={UpdateTask} />}
    </div>
  )
}

export default Task