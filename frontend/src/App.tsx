import { useState } from 'react'
import Panel from './components/panel/Panel'
import List from './components/list/List'
import Task from './components/task/Task'
import type { Task as TaskType } from './types/task'
import './App.css'

function App() {
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null)

  return (
    <section>
      <Panel>
        <List onSelectTask={setSelectedTask} />
      </Panel>
      <Panel>
        <Task task={selectedTask} />
      </Panel>
    </section>
  )
}

export default App