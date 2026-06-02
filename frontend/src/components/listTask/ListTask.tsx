import type { Task } from '../../types/task'
import { formatDate } from '../../utils/date'
import './ListTask.css'

interface ListTaskProps {
  task: Task
  onClick: () => void
}

function ListTask({ task, onClick }: ListTaskProps) {
  return (
    <div className="ListTask" onClick={onClick}>
      <h3>{task.descripcion}</h3>
      <span>{task.estado}</span>
      <span>{formatDate(task.fechaCreacion)}</span>
    </div>
  )
}

export default ListTask