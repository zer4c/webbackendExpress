import { useState, useEffect } from 'react'
import ListTask from '../listTask/ListTask'
import Form from '../form/Form'
import { getItems, createItem } from '../../services/itemService'
import type { Task } from '../../types/task'
import './List.css'

interface ListProps {
  onSelectTask: (task: Task) => void
}

function List({ onSelectTask }: ListProps) {
  const [items, setItems] = useState<Task[]>([])
  const [showForm, setShowForm] = useState(false)

  const fetchItems = async () => {
    getItems()
      .then(data => setItems(data.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleCreate = async (data: Partial<Task>) => {
    try {
      await createItem(data.descripcion ?? '', data.fechaFinal ?? null)
      setShowForm(false)
      fetchItems()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="List">
      <div className="List-header">
        <h2>Tareas</h2>
        <button onClick={() => setShowForm(true)}>+ Crear</button>
      </div>
      {items.map(item => (
        <ListTask key={item.id} task={item} onClick={() => onSelectTask(item)} />
      ))}
      {showForm && (
        <Form
          onClose={() => setShowForm(false)}
          onSubmit={handleCreate}
        />
      )}
    </div>
  )
}

export default List