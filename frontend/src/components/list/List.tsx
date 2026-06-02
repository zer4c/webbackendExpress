import { useState } from 'react'
import ListTask from '../listTask/ListTask'
import Form from '../form/Form'
import { createItem } from '../../services/itemService'
import type { Task } from '../../types/task'
import './List.css'

interface ListProps {
  onSelectTask: (task: Task) => void
  onRefresh: () => void
  items: Task[]
}

function List({ onSelectTask, onRefresh, items }: ListProps) {
  const [showForm, setShowForm] = useState(false)

  const FinishCreate = async (data: Partial<Task>) => {
    try {
      await createItem(data.descripcion ?? '', data.fechaFinal ?? null)
      setShowForm(false)
      onRefresh()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="List">
      <div className="List-header">
        <h2>Tareas</h2>
        <button onClick={() => setShowForm(true)}>Crear</button>
      </div>
      {items.map((item) => (
        <ListTask key={item.id} task={item} onClick={() => onSelectTask(item)} />
      ))}
      {showForm && <Form onClose={() => setShowForm(false)} onSubmit={FinishCreate} />}
    </div>
  )
}

export default List