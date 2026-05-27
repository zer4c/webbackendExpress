import type { Task as TaskType } from '../../types/task'
import './Task.css'

interface TaskProps {
  task: TaskType | null
}

function Task({ task }: TaskProps) {
  if (!task) return <p className="Task-empty">Selecciona una tarea para ver el detalle.</p>

  return (
    <div className="Task">
      <h1>Informacion Tarea</h1>
      <h2>{task.descripcion ?? "Sin descripcion"}</h2>
      <p><strong>Estado:</strong> {task.estado}</p>
      <p><strong>Fecha de creación:</strong> {task.fechaCreacion}</p>
      <p><strong>Fecha final:</strong> {task.fechaFinal ?? 'Sin fecha'}</p>
    </div>
  )
}

export default Task