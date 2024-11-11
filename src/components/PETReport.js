// src/components/PETReport.js
import React, { useEffect, useState } from 'react';
import '../styles/PETStyles.css';

const PETReport = () => {
    const [reportData, setReportData] = useState([]);
    const [error, setError] = useState('');

    // Función para obtener los datos del reporte de captura de PET
    const fetchReportData = async () => {
        try {
            const token = localStorage.getItem('token'); // Usa el token de autenticación si está disponible
            const response = await fetch('http://54.177.153.3:5000/api/pet/pet-report', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setReportData(data);
                setError('');
            } else if (response.status === 403) {
                setError('Acceso denegado. No tienes permisos para ver este reporte.');
            } else if (response.status === 401) {
                setError('Sesión expirada. Por favor, inicia sesión nuevamente.');
            } else {
                setError(`Error al obtener los datos del reporte: ${response.statusText}`);
            }
        } catch (error) {
            setError('Error en la conexión con el servidor');
            console.error('Error en la solicitud de datos:', error);
        }
    };

    useEffect(() => {
        fetchReportData(); // Llamada a la función al cargar el componente
    }, []);

    return (
        <div className="pet-report">
            <h2>Reporte de Captura de PET</h2>
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <table className="pet-report-table">
                    <thead>
                        <tr>
                            <th>Fecha de Captura</th>
                            <th>Peso (kg)</th>
                            <th>Precio (USD)</th>
                            <th>Precio (MXN)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map((entry, index) => (
                            <tr key={index}>
                                <td>{new Date(entry.capture_date).toLocaleDateString()}</td>
                                <td>{entry.weight_kg}</td>
                                <td>{entry.price_usd}</td>
                                <td>{entry.price_mxn}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PETReport;
