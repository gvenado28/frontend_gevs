// src/components/PETCapture.js
import React, { useState } from 'react';
import '../styles/PETStyles.css';

const PETCapture = () => {
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState('');
    const [priceUSD, setPriceUSD] = useState('');
    const [priceMXN, setPriceMXN] = useState('');
    const [message, setMessage] = useState('');

    const conversionRate = 18;
    const ratePerKgUSD = 0.5;

    const calculatePrices = (weight) => {
        const priceInUSD = weight * ratePerKgUSD;
        const priceInMXN = priceInUSD * conversionRate;
        setPriceUSD(priceInUSD.toFixed(2));
        setPriceMXN(priceInMXN.toFixed(2));
    };

    const handleWeightChange = (event) => {
        const newWeight = event.target.value;
        setWeight(newWeight);
        calculatePrices(newWeight);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(''); // Reinicia el mensaje

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('Por favor, inicia sesión para registrar capturas.');
                return;
            }

            const response = await fetch('http://54.177.153.3:5000/api/pet/pet-capture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    capture_date: date,
                    weight_kg: weight,
                }),
            });

            if (response.ok) {
                setMessage('Captura registrada exitosamente.');
                setDate('');
                setWeight('');
                setPriceUSD('');
                setPriceMXN('');
            } else {
                setMessage('Error al registrar la captura.');
                console.error('Error al registrar captura:', await response.json());
            }
        } catch (error) {
            setMessage('Error en la conexión con el servidor.');
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div className="pet-capture">
            <h2>Captura Semanal de PET</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Fecha de Captura:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Peso del PET (kg):
                    <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={weight}
                        onChange={handleWeightChange}
                        required
                    />
                </label>
                <label>
                    Precio Calculado (USD):
                    <input type="text" value={priceUSD} readOnly />
                </label>
                <label>
                    Precio Calculado (MXN):
                    <input type="text" value={priceMXN} readOnly />
                </label>
                <button type="submit">Registrar Captura</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default PETCapture;
