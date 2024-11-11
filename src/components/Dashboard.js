// src/components/Dashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/Dashboard.css';

// Registrar las escalas y elementos
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = ({ userRole, userEmail }) => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Función para obtener los datos del reporte de captura de PET
  const fetchReportData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token'); // Usa el token de autenticación
      const response = await fetch('http://54.177.153.3:5000/api/pet/pet-report', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();

        // Filtrar datos según el rol del usuario
        if (userRole === 'admin') {
          setWeeklyData(data);
        } else {
          setWeeklyData(data.filter(item => item.user_email === userEmail));
        }
        setFilteredData(data); // Por defecto, muestra todos los datos
      } else {
        console.error('Error al obtener los datos del reporte:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud de datos:', error);
    }
  }, [userRole, userEmail]);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = weeklyData.filter((data) =>
        new Date(data.capture_date) >= new Date(startDate) &&
        new Date(data.capture_date) <= new Date(endDate)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(weeklyData);
    }
  }, [startDate, endDate, weeklyData]);

  // Configuración de datos para el gráfico
  const chartData = {
    labels: filteredData.map(data => new Date(data.capture_date).toLocaleDateString()),
    datasets: [
      {
        label: 'Peso de PET recolectado (kg)',
        data: filteredData.map(data => data.weight_kg),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Precio en USD',
        data: filteredData.map(data => data.price_usd),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Precio en MXN',
        data: filteredData.map(data => data.price_mxn),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Resumen de Captura Semanal de PET</h2>
      <div className="filters">
        <label>
          Fecha de inicio:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          Fecha de fin:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </div>
      <div className="chart-container">
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
    </div>
  );
};

export default Dashboard;
