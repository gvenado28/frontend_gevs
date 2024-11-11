import React, { useState } from 'react';
import '../styles/TaskForm.css'; // Importar estilos

function TaskForm({ addTask }) {
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      addTask(taskTitle);
      setTaskTitle('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Add a new task"
        className="task-input"
      />
      <button type="submit" className="task-button">Add Task</button>
    </form>
  );
}

export default TaskForm;
