import { useState, useEffect } from "react";
import "./App.css";


const Header = ({ name, avatar }) => (
  <header style={{ textAlign: "center", marginBottom: "20px" }}>
    <img
      src={avatar}
      alt="avatar"
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        border: "3px solid #007bff",
        objectFit: "cover",
        backgroundColor: "#eee" 
      }}
    />
    <h2 style={{ margin: "10px 0", color: "#333" }}>{name}</h2>
  </header>
);


const TodoItem = ({ todo, index, onDelete, onToggle }) => (
  <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", margin: "5px 0", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(index)} />
      <span style={{ textDecoration: todo.completed ? "line-through" : "none", color: todo.completed ? "#888" : "#000" }}>
        {todo.text}
      </span>
    </div>
    <button onClick={() => onDelete(index)} style={{ border: "none", background: "none", cursor: "pointer" }}>❌</button>
  </div>
);


export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (text.trim()) {
      setTodos([...todos, { text, completed: false }]);
      setText("");
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleTodo = (index) => {
    setTodos(todos.map((todo, i) => i === index ? { ...todo, completed: !todo.completed } : todo));
  };

  return (
    <div className="container" style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", background: "#fff", borderRadius: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
      
      {}
      <Header 
        name="Eдизавета" 
        avatar="/avatar.jpg" 
      />

      <form onSubmit={addTodo} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Что нужно сделать?" 
          style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <button type="submit" style={{ padding: "10px 15px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Добавить</button>
      </form>

      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <TodoItem key={index} index={index} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} />
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#aaa" }}>Список пуст...</p>
      )}
    </div>
  );
}
