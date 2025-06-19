import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './Home.css';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigateTo = useNavigate();
  const [todos, setTodos] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [newTodo, setNewTodo] = useState("")
  const BASE_URL = import.meta.env.VITE_API_URL;
  const inputRef = useRef(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/todo/fetch`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      setTodos(response.data.todos || [])
      setError(null)
    } catch (error) {
      console.error("Error fetching todos:", error)
      setError("Failed to fetch todos")
      toast.error("Failed to fetch todos")
    } finally {
      setLoading(false)
    }
  }

  const createTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      setLoading(true)
      const response = await axios.post(`${BASE_URL}/todo/create`, {
        text: newTodo,
        completed: false
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })

      const createdTodo = response?.data?.newTodo
      if (createdTodo) {
        setTodos(prev => [...prev, createdTodo])
        setNewTodo("")
        inputRef.current?.focus()
        toast.success("Todo added!")
      } else {
        toast.error("Unexpected response")
      }
    } catch (error) {
      console.error("Error creating todo:", error)
      toast.error("Failed to create todo")
    } finally {
      setLoading(false)
    }
  }

  const updateTodo = async (id) => {
    const todoToUpdate = todos.find((t) => t._id === id)
    if (!todoToUpdate) return;

    try {
      setLoading(true)
      const response = await axios.put(`${BASE_URL}/todo/update/${id}`, {
        ...todoToUpdate,
        completed: !todoToUpdate.completed
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })

      setTodos(todos.map(t => t._id === id ? response.data.todo : t))
      toast.success("Todo updated")
    } catch (error) {
      console.error("Error updating todo:", error)
      toast.error("Failed to update todo")
    } finally {
      setLoading(false)
    }
  }

  const deleteTodo = async (id) => {
    try {
      setLoading(true)
      await axios.delete(`${BASE_URL}/todo/delete/${id}`, {
        withCredentials: true
      })
      setTodos(todos.filter(t => t._id !== id))
      toast.success("Todo deleted")
    } catch (error) {
      console.error("Error deleting todo:", error)
      toast.error("Failed to delete todo")
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await axios.get(`${BASE_URL}/user/logout`, {
        withCredentials: true
      });
      localStorage.removeItem("jwt");
      toast.success("User logged out");
      navigateTo("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="cont">
      <div className='heading'>Todo App</div>
      <div className='input'>
        <input
          ref={inputRef}
          type="text"
          placeholder='Add a new todo'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTodo();
            }
          }}
        />
        <button id='add' onClick={createTodo}>Add</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <ul>
        {todos.filter(Boolean).map((todo, index) => (
          <li key={todo._id || index}>
            <div className='li'>
              <input
                type="checkbox"
                style={{ cursor: "pointer" }}
                checked={todo.completed}
                onChange={() => updateTodo(todo._id)}
              />
              <span className={todo.completed ? "line-through" : ""}>
                {todo.text}
              </span>
            </div>
            <button className='dltbtn' onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <p>{todos.filter(t => !t.completed).length} Todo(s) remaining</p>

      <div className='logout'>
        <button id='logout' onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Home
