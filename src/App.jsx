import { useState } from "react"
import "./styles.css"

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    e.preventDefault()

    if (newItem.trim() !== "") {
      setTodos((currentTodos) => {
        return [ 
          ...currentTodos,
          { id: crypto.randomUUID(), title: newItem, completed: false },
        ]

      })
    }  

    setNewItem("")

  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    const todoToDelete = todos.find(todo => todo.id === id)
    if (todoToDelete && todoToDelete.completed) {
      setTodos(currentTodos => {
        return currentTodos.filter(todo => todo.id !== id)
      })
    }
}

  return (
    <>
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item"> Enter an action </label>
        <input 
        value={newItem} 
        onChange={e => setNewItem(e.target.value)} 
        type="text" 
        id="item" />
        
      </div>

      <button className="btn"> Add to list </button>

    </form>

    <h1 className="header"> Silver's Todo List </h1>
    <ul className="list">
      {todos.length === 0 && 'No todos' }
      {todos.map(todo => {
        return (
          <li key = {todo.id} >
            <label>
              <input type="checkbox" checked = {todo.completed} 
              onChange={e => toggleTodo(todo.id, e.target.checked)}     
              />
              {todo.title}
            </label>
            <button 
            onClick={() => deleteTodo(todo.id)}
            className="btn btn-danger"> Delete </button>
          </li>
        )
        })}
      
    </ul>
  </>
  )
}

