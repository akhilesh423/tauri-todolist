import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [todo, setTodo] = useState("")
  const [allTodos, setAllTodos] = useState([])

  const getTodos = async () => {
    const response = await fetch("https://660289539d7276a755537785.mockapi.io/api/Todos", {
      "method": "GET"
    })
    if (response.ok) {
      const data = await response.json()
      setAllTodos(data)
    }
  }
  useEffect(() => {
    getTodos()
  }, [])

  const handleInput = (e) => {
    setTodo(e.target.value)
  }

  const handleSubmit = async () => {
    setTodo("")
    const response = await fetch("https://660289539d7276a755537785.mockapi.io/api/Todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "Todo": todo,
        "Status": "In-progress"
      })
    });

    if (response.ok) {

      const data = await response.json()
      setAllTodos(prevTodos => [...prevTodos, data]);
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`https://660289539d7276a755537785.mockapi.io/api/Todos/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      setAllTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    }

  };

  const handleEdit = async (todo, id) => {
    const response = await fetch(`https://660289539d7276a755537785.mockapi.io/api/Todos/${id}`, {
      "method": "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "Todo": todo,
        "Status": "Done"
      })
    })
    if (response.ok) {

      const data = await response.json()
      setAllTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === id ? data : todo))
      );
    }
  }

  return (
    <div className="main-container">
      <h1>Todo-List</h1>
      <div className="todo-container">
        <input value={todo} onChange={handleInput} className="input" type="text" />
        <button className="button" onClick={handleSubmit}>Submit</button>
      </div>
      <ul className="todo-list">
        {allTodos.map((eachTodo) => (
          <li className="each-todo" key={eachTodo.id}>
            <div className="todo-details">
              <h4>Todo: {eachTodo.Todo}</h4>
              <h4>Status: {eachTodo.Status}</h4>
            </div>
            <div className="buttons">
              <button onClick={() => handleEdit(eachTodo.Todo, eachTodo.id)}>Edit</button>
              <button onClick={() => handleDelete(eachTodo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>


    </div>
  );


}

export default App;
