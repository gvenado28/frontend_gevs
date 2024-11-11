import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import '../styles/Main.css'; // Importar estilos

function Main() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskTitle) => {
    const newTask = { id: Date.now(), title: taskTitle };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="main-content">
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default Main;
