// src/components/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role] = useState('operator'); // Rol predeterminado como "operator"
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState({
    length: true,
    uppercase: true,
    lowercase: true,
    number: true,
    specialChar: true,
  });

  const navigate = useNavigate();

  // Validación de requisitos de la contraseña
  const handlePasswordChange = (password) => {
    setPassword(password);
    setPasswordError({
      length: password.length < 8,
      uppercase: !/[A-Z]/.test(password),
      lowercase: !/[a-z]/.test(password),
      number: !/\d/.test(password),
      specialChar: !/[@$!%*?&]/.test(password),
    });
  };

  const isPasswordValid = () => Object.values(passwordError).every((error) => !error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!isPasswordValid()) {
      setError('La contraseña no cumple con los requisitos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('http://54.177.153.3:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (response.ok) {
        setSuccessMessage('Usuario registrado correctamente. Redirigiendo a la página de inicio de sesión...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al registrarse.');
      }
    } catch (err) {
      setError('Ocurrió un error, por favor intenta de nuevo.');
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
          required
          className="register-input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          className="register-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          placeholder="Contraseña"
          required
          className="register-input"
        />
        <div className="password-requirements">
          {(!isPasswordValid()) && (
            <>
              <p className="requirements-message">La contraseña debe incluir:</p>
              <ul>
                <li className={`requirement ${!passwordError.length ? 'valid' : ''}`}>
                  {passwordError.length ? 'Al menos 8 caracteres' : '✓ Al menos 8 caracteres'}
                </li>
                <li className={`requirement ${!passwordError.uppercase ? 'valid' : ''}`}>
                  {passwordError.uppercase ? 'Una letra mayúscula' : '✓ Una letra mayúscula'}
                </li>
                <li className={`requirement ${!passwordError.lowercase ? 'valid' : ''}`}>
                  {passwordError.lowercase ? 'Una letra minúscula' : '✓ Una letra minúscula'}
                </li>
                <li className={`requirement ${!passwordError.number ? 'valid' : ''}`}>
                  {passwordError.number ? 'Un número' : '✓ Un número'}
                </li>
                <li className={`requirement ${!passwordError.specialChar ? 'valid' : ''}`}>
                  {passwordError.specialChar ? 'Un carácter especial (@$!%*?&)' : '✓ Un carácter especial (@$!%*?&)'}
                </li>
              </ul>
            </>
          )}
        </div>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar Contraseña"
          required
          className="register-input"
        />
        <input
          type="text"
          value={role}
          disabled
          className="register-input"
          placeholder="Rol (solo lectura)"
        />
        <button type="submit" className="register-button">Registrar</button>
      </form>
      <p className="login-prompt">
        ¿Ya tienes una cuenta? <Link to="/login" className="register-link">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Register;
