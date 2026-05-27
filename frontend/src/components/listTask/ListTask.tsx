import type { Task } from '../../types/task'
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
    </div>
  )
}

export default ListTask