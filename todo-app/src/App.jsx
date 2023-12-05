import "./styles.css";
import { useState } from "react";

const App = () => {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    // this adds a new todo object to the end of the array

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false
        }
      ]
    });
    setNewItem(""); //clear out input
  };

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          // console.log(completed)
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type="text" id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger"
              >Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
};

export default App;