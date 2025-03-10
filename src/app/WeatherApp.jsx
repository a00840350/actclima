import {useState} from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    const apiKey = "6e3ae0dd734249e0866132159250303";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Ciudad no encontrada");
      const data = await response.json();
      setTemperature(data.current.temp_c);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTemperature(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-md bg-white rounded-xl shadow-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">Consulta el Clima</h1>
        <input
          type="text"
          placeholder="Ingresa una ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={fetchWeather}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Obtener Clima
        </button>
        {temperature !== null && (
          <p className="text-lg font-semibold">Temperatura: {temperature}°C</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
