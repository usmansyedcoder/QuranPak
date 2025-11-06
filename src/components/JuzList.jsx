import React from "react";
import "./List.css";

const JuzList = ({ juzs, onSelectJuz }) => {
  return (
    <div className="list-container">
      <h2>Juz</h2>
      <ul>
        {juzs.map((juz, index) => (
          <li key={index} onClick={() => onSelectJuz(index + 1)}>
            Para {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JuzList;
