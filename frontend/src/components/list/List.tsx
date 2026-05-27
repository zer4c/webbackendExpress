import { useState, useEffect } from 'react'
import ListTask from '../listTask/ListTask'
import { getItems } from '../../services/itemService'
import type { Task } from '../../types/task'
import './List.css'

interface ListProps {
  onSelectTask: (task: Task) => void
}

function List({ onSelectTask }: ListProps) {
  const [items, setItems] = useState<Task[]>([])

  useEffect(() => {
    getItems()
      .then(data => setItems(data.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="List">
      <h2>Tareas</h2>
      {items.map(item => (
        <ListTask key={item.id} task={item} onClick={() => onSelectTask(item)} />
      ))}
    </div>
  )
}

export default List