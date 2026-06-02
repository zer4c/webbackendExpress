import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Panel from '../components/panel/Panel'
import List from '../components/list/List'
import Task from '../components/task/Task'
import { getItems } from '../services/itemService'
import type { Task as TaskType } from '../types/task'

function PantallaTodoList() {
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null)
  const [items, setItems] = useState<TaskType[]>([])
  const navigate = useNavigate()

  const FetchItems = async () => {
    try {
      const data = await getItems()
      setItems(data.data)
      setSelectedTask((prev) => prev ? data.data.find((i) => i.id === prev.id) ?? null : null)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => { FetchItems() }, [])

  return (
    <div>
      <div className="topbar">
        <button onClick={() => navigate('/drive')}>Drive</button>
      </div>
      <section className="panels">
        <Panel>
          <List onSelectTask={setSelectedTask} onRefresh={FetchItems} items={items} />
        </Panel>
        <Panel>
          <Task task={selectedTask} onRefresh={FetchItems} onClearSelection={() => setSelectedTask(null)} />
        </Panel>
      </section>
    </div>
  )
}

export default PantallaTodoList