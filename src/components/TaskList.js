// src/components/TaskList.js
import React from 'react';
import '../styles/TaskList.css';

function TaskList({ tasks }) {
  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Lista de Tareas</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No hay tareas disponibles.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
              <h3 className="task-title">{task.title}</h3>
              <p className="task-due-date">Fecha de entrega: {task.dueDate}</p>
              <p className="task-status">Estado: {task.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
