// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importar Link y useNavigate
import '../styles/Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicializar el hook de navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://54.177.153.3:5000/api/auth/login', { // Asegúrate que la ruta esté correcta
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Almacena el token, rol y email en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('userEmail', data.user.email);

        // Llama a onLogin con los datos completos del usuario
        onLogin({ role: data.user.role, email: data.user.email, token: data.token });
        navigate('/dashboard'); // Redirige al dashboard después de iniciar sesión
      } else if (response.status === 401) {
        setError('Credenciales incorrectas.');
      } else {
        setError('Ocurrió un error, por favor intenta de nuevo.');
      }
    } catch (err) {
      setError('Ocurrió un error, por favor intenta de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Iniciar Sesión</button>
      </form>
      <p className="register-prompt">
        ¿No tienes una cuenta? <Link to="/register" className="register-link">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;
