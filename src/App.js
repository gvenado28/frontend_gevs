// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import PETCapture from './components/PETCapture';
import PETReport from './components/PETReport';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Cargar el estado de autenticación y rol del usuario desde localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');
    if (token && role && email) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserEmail(email);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserRole(userData.role);
    setUserEmail(userData.email);

    // Guardar los datos en localStorage para persistencia
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userEmail', userData.email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserEmail(null);

    // Limpiar localStorage al cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
  };

  return (
    <Router>
      <div className="app">
        <Header 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout} 
          userRole={userRole} 
          userEmail={userEmail} 
        />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas */}
            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
                {userRole === 'admin' && (
                  <>
                    <Route path="/create-task" element={<CreateTask />} />
                    <Route path="/task-list" element={<TaskList />} />
                  </>
                )}
                <Route path="/pet-capture" element={<PETCapture />} />
                <Route path="/pet-report" element={<PETReport />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<Navigate to="/login" />} />
                <Route path="/create-task" element={<Navigate to="/login" />} />
                <Route path="/task-list" element={<Navigate to="/login" />} />
                <Route path="/pet-capture" element={<Navigate to="/login" />} />
                <Route path="/pet-report" element={<Navigate to="/login" />} />
              </>
            )}

            <Route path="*" element={<Navigate to="/" />} /> {/* Redirección a Home por defecto */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
