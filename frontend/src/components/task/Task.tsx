import { useState } from 'react'
import type { Task as TaskType } from '../../types/task'
import { TaskState } from '../../types/states'
import Form from '../form/Form'
import './Task.css'
import { deleteItem, patchItem } from '../../services/itemService'

interface TaskProps {
  task: TaskType | null
}

function Task({ task }: TaskProps) {
  const [message, setMessage] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  if (!task) return <p className="Task-empty">Selecciona una tarea para ver el detalle.</p>

  const DeleteTask = async () => {
    try {
      await deleteItem(task.id)
      setMessage('Eliminado')
    } catch {
      setMessage('No se pudo eliminar')
    }
  }

  const UpdateTask = async (data: Partial<TaskType>) => {
    try {
      await patchItem(task.id, data)
      setMessage('Actualizado')
      setShowForm(false)
    } catch {
      setMessage('No se pudo actualizar')
    }
  }

  const FinishTask = async () => {
    try {
      await patchItem(task.id, { estado: TaskState.COMPLETADO })
      setMessage('Tarea terminada')
    } catch {
      setMessage('No se pudo marcar como finalizado')
    }
  }

  return (
    <div className="Task">
      <h1>Informacion Tarea</h1>
      <h2>{task.descripcion || 'Sin descripcion'}</h2>
      <p><strong>Estado:</strong> {task.estado}</p>
      <p><strong>Fecha de creación:</strong> {task.fechaCreacion}</p>
      <p><strong>Fecha final:</strong> {task.fechaFinal ?? 'Sin fecha'}</p>
      <section className="Options">
        <button onClick={DeleteTask}>Eliminar</button>
        <button onClick={() => setShowForm(true)}>Actualizar</button>
        <button onClick={FinishTask}>Terminar Tarea</button>
      </section>
      {message && <div className="message">{message}</div>}
      {showForm && (
        <Form
          task={task}
          onClose={() => setShowForm(false)}
          onSubmit={UpdateTask}
        />
      )}
    </div>
  )
}

export default Task