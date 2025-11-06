// src/components/QuranApi.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuranApi.css";

const QuranApi = () => {
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://api.alquran.cloud/v1/surah/2")
      .then((response) => {
        setAyahs(response.data.data.ayahs);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="quran-container">Loading...</div>;
  }

  if (error) {
    return <div className="quran-container">Error: {error}</div>;
  }

  return (
    <div className="quran-container">
      <h1>Surah Al-Fatiha</h1>
      <ul>
        {ayahs.map((ayah) => (
          <li key={ayah.number}>{ayah.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuranApi;
