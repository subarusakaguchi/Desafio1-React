import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [ids, setNewId] = useState<number[]>([])

  function handleCreateNewTask() {
    if (newTaskTitle && newTaskTitle !== '') {
      let newId: number = 0
      if (ids.length > 0) {
        const lastEl: number = ids[ids.length - 1]
        newId = lastEl + 1
      }

      const newTask: Task = {
        id: newId,
        title: newTaskTitle,
        isComplete: false
      }

      const newIds: number[] = [...ids, newId]
      setNewId(newIds)
      
      const newTasks: Task[] = [...tasks, newTask]
      setTasks(newTasks)

      setNewTaskTitle('')
    } else {
      alert('Título vazio!')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const newTaskState: Task = tasks.filter((task) => {return task.id === id})[0]
    const index = tasks.indexOf(newTaskState)
    if (newTaskState) {
      newTaskState.isComplete = newTaskState.isComplete ? false : true
      const newTasks:Task[] = [...tasks.slice(0, index), newTaskState, ...tasks.slice(index + 1)]
      setTasks(newTasks)
    }
  }

  function handleRemoveTask(id: number) {
    const newTasks: Task[] = tasks.filter((task) => {return task.id !== id})
    const newIds: number[] = ids.filter((idCompare) => {return idCompare !== id})

    setTasks(newTasks)
    setNewId(newIds)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}