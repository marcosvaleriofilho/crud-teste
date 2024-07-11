import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:3001/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao dar fetch tasks:", error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post(API_URL, { task: newTask });
      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.error("Erro ao adicionar task:", error);
    }
  };

  const updateTask = async (id, status) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status });
      fetchTasks();
    } catch (error) {
      console.error("Erro ao atualizar task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Erro ao deletar task:", error);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Digite uma nova task"
      />
      <button onClick={addTask}>Adicionar</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.task} - </span>
            <select
              value={task.status}
              onChange={(e) => updateTask(task.id, e.target.value)}
            >
              <option value="pending">Pendente</option>
              <option value="done">Concluído</option>
            </select>
            <button onClick={() => deleteTask(task.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
