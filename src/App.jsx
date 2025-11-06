import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SurahList from "./components/SurahList";
import JuzList from "./components/JuzList";
import AyahList from "./components/AyahList";
import "./App.css";

const App = () => {
  const [surahs, setSurahs] = useState([]);
  const [juzs, setJuzs] = useState([...Array(30).keys()]);
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ayahSectionRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://api.alquran.cloud/v1/surah")
      .then((response) => setSurahs(response.data.data))
      .catch((error) => setError("Failed to load Surah list. Please try again later."));
  }, []);

  const scrollToAyahs = () => {
    if (ayahSectionRef.current) {
      ayahSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectSurah = (surahNumber) => {
    setLoading(true);
    setError(null);
    axios
      .get(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
      .then((response) => {
        setAyahs(response.data.data.ayahs);
        setLoading(false);
        scrollToAyahs();
      })
      .catch(() => {
        setError("Network error — unable to load Surah. Please check your connection.");
        setLoading(false);
      });
  };

  const handleSelectJuz = (juzNumber) => {
    setLoading(true);
    setError(null);
    axios
      .get(`https://api.alquran.cloud/v1/juz/${juzNumber}`)
      .then((response) => {
        setAyahs(response.data.data.ayahs);
        setLoading(false);
        scrollToAyahs();
      })
      .catch(() => {
        setError("Network error — unable to load Juz. Please try again later.");
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📖 Read Quran Pak and Win Jannah 📖</h1>
        <h2>Choose your Para or Surah and start reading the Holy Quran</h2>

        <div className="list-wrapper">
          <SurahList surahs={surahs} onSelectSurah={handleSelectSurah} />
          <JuzList juzs={juzs} onSelectJuz={handleSelectJuz} />
        </div>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error-message">{error}</div>}

        <div id="ayah-section" ref={ayahSectionRef} className="ayah-list-container">
          {!loading && !error && <AyahList ayahs={ayahs} />}
        </div>
      </header>
    </div>
  );
};

export default App;
