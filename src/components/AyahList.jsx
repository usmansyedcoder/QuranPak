import "./List.css";

const AyahList = ({ ayahs }) => {
  return (
    <div className="ayah-list-container">
      <ul>
        {ayahs.map((ayah) => (
          <li key={ayah.number}>{ayah.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default AyahList;
