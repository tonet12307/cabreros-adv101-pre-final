import { useState } from "react";

const sampleTodos = [
  {
    id: 1700445601,
    title: "Grocery Shopping",
    description: "Pick up milk, eggs, cheese, and fresh produce from the market.",
    date: "November 20, 2025 09:23 PM",
    completed: false,
  },
  {
    id: 1700445602,
    title: "Pay Utility Bills",
    description: "Ensure electricity and internet bills are paid before the due date (Friday).",
    date: "November 20, 2025 09:23 PM",
    completed: false,
  },
  {
    id: 1700445603,
    title: "Call Mom",
    description: "Check in and finalize plans for the upcoming holiday weekend.",
    date: "November 20, 2025 09:23 PM",
    completed: false,
  },
  {
    id: 1700445604,
    title: "Car Wash",
    description: "Take the car to the wash and check the tire pressure.",
    date: "November 20, 2025 09:23 PM",
    completed: false,
  },
  {
    id: 1700445605,
    title: "Book Appointment",
    description: "Schedule the annual physical check-up with Dr. Peterson.",
    date: "November 20, 2025 09:23 PM",
    completed: false,
  },
];

export default function Home() {
  const [todos, setTodos] = useState(sampleTodos);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("todo");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDesc, setEditingDesc] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const addTodo = () => {
    if (!newTitle.trim()) return;
    const next = {
      id: Date.now(),
      title: newTitle,
      description: "",
      date: new Date().toLocaleString(),
      completed: false,
    };
    setTodos([next, ...todos]);
    setNewTitle("");
  };

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  const toggleComplete = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const startEditing = (t) => {
    setEditingId(t.id);
    setEditingTitle(t.title);
    setEditingDesc(t.description);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, title: editingTitle, description: editingDesc } : t))
    );
    setEditingId(null);
  };

  const filtered = todos
    .filter((t) => (filter === "completed" ? t.completed : !t.completed))
    .filter((t) => {
      const q = query.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || String(t.id).includes(q)
      );
    });

  return (
    <div className="app-container">
      <div className="topbar">
        <input
          className="search-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          className="search-input"
          placeholder="New todo title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ maxWidth: 320 }}
        />
        <button className="add-btn" onClick={addTodo}>
          Add Todo
        </button>
      </div>

      <div className="tabs">
        <button className={`tab ${filter === "todo" ? "active" : ""}`} onClick={() => setFilter("todo")}>Todos</button>
        <button className={`tab ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <table className="todo-table">
        <thead>
          <tr>
            <th style={{ width: 110 }}>ID</th>
            <th style={{ width: 180 }}>Title</th>
            <th>Description</th>
            <th style={{ width: 220 }}>Date Created/Updated</th>
            <th style={{ width: 180 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>
                {editingId === t.id ? (
                  <input value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} />
                ) : (
                  <div className="todo-row-title">{t.title}</div>
                )}
              </td>
              <td>
                {editingId === t.id ? (
                  <input value={editingDesc} onChange={(e) => setEditingDesc(e.target.value)} style={{ width: '100%' }} />
                ) : (
                  <div className="todo-row-desc">{t.description}</div>
                )}
              </td>
              <td>{t.date}</td>
              <td>
                <div className="actions">
                  {editingId === t.id ? (
                    <>
                      <button className="action-btn btn-edit" onClick={() => saveEdit(t.id)}>Save</button>
                      <button className="action-btn" onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="action-btn btn-edit" onClick={() => startEditing(t)}>Edit</button>
                      <button className="action-btn btn-delete" onClick={() => deleteTodo(t.id)}>Delete</button>
                      <button className="action-btn btn-complete" onClick={() => toggleComplete(t.id)}>✔</button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
