// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header({ isAuthenticated, onLogout, user }) {
  return (
    <header className="header">
      <h1>Captura de PET</h1>
      <nav className="navigation">
        <Link to="/" className="nav-button">Inicio</Link>
        {isAuthenticated ? (
          <>
            <span className="user-info">Bienvenido, {user?.username}</span>
            <Link to="/dashboard" className="nav-button">Dashboard</Link>
            <Link to="/create-task" className="nav-button">Crear Tarea</Link>
            <Link to="/task-list" className="nav-button">Lista de Tareas</Link>
            <Link to="/pet-capture" className="nav-button">Captura de PET</Link>
            <Link to="/pet-report" className="nav-button">Reporte de PET</Link>
            <button onClick={onLogout} className="nav-button logout-button">Cerrar Sesión</button>
          </>
        ) : (
          <Link to="/login" className="nav-button">Iniciar Sesión</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
