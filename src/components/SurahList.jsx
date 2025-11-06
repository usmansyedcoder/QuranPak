import "./List.css";

const SurahList = ({ surahs, onSelectSurah }) => {
  return (
    <div className="list-container">
      <h2>Surahs</h2>
      <ul>
        {surahs.map((surah) => (
          <li key={surah.number} onClick={() => onSelectSurah(surah.number)}>
            {surah.englishName} ({surah.name})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurahList;
