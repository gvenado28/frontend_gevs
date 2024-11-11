// src/components/Home.js
import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Plataforma de Captura y Gestión de PET</h1>
        <p className="home-subtitle">Promoviendo el reciclaje y la sostenibilidad a través de la tecnología</p>
      </header>
      
      <section className="home-introduction">
        <div className="home-intro-content">
          <h2>¿Por qué Capturar PET?</h2>
          <p>
            La captura de PET es una iniciativa importante para reducir los residuos plásticos en el medio ambiente. Con nuestra plataforma,
            te ofrecemos una forma sencilla y organizada de registrar la cantidad de PET recolectado, facilitando el seguimiento y optimización de
            tus esfuerzos de reciclaje.
          </p>
        </div>
         <img
        src={`${process.env.PUBLIC_URL}/images/PET.png`} // Ruta desde `public/images`
        alt="Sustainable PET Recycling"
        className="home-image"
      />
      </section>

      <section className="home-features">
        <h2>Características Principales</h2>
        <div className="features-list">
          <div className="feature">
            <h3>Registro de Capturas</h3>
            <p>Registra la cantidad de PET recolectado semanalmente, con un cálculo automático de valor en USD y MXN según el peso recolectado.</p>
          </div>
          <div className="feature">
            <h3>Reportes Detallados</h3>
            <p>Visualiza reportes de capturas pasadas, incluyendo fechas, cantidades y valores, para un análisis completo del impacto ambiental.</p>
          </div>
          <div className="feature">
            <h3>Gestión de Usuarios</h3>
            <p>Usuarios administradores y operadores pueden colaborar en la plataforma, asegurando que los datos estén siempre actualizados.</p>
          </div>
          <div className="feature">
            <h3>Análisis de Impacto</h3>
            <p>Obtén métricas e información clave para conocer el impacto positivo de tu recolección y optimizar las futuras capturas de PET.</p>
          </div>
        </div>
      </section>

      <section className="home-call-to-action">
        <h2>Únete a la Iniciativa</h2>
        <p>
          Nuestra plataforma está diseñada para cualquier organización o individuo que desee colaborar en la preservación del medio ambiente.
          Regístrate y empieza a hacer la diferencia hoy mismo.
        </p>
        <a href="/register" className="cta-button">¡Regístrate Ahora!</a>
      </section>
    </div>
  );
}

export default Home;
