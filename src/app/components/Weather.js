import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '6e3ae0dd734249e0866132159250303'; // Reemplaza con tu API Key de WeatherAPI
  const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=`;

  const searchTemperature = async () => {
    try {
      const response = await axios.get(`${API_URL}${city}`);
      setTemperature(response.data.current.temp_c);
      setError(null);
    } catch (err) {
      setError('Ciudad no encontrada');
      setTemperature(null);
    }
  };

  return (
    <div>
      <h1>Buscar Temperatura</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ingresa una ciudad"
      />
      <button onClick={searchTemperature}>Buscar</button>

      {temperature !== null && (
        <p>La temperatura en {city} es: {temperature}°C</p>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default Weather;