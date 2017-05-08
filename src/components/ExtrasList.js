import React from 'react';
import "../stylesheets/ExtrasList.css";

const ExtrasList = ({ title, list }) => {
  const listItems = list.map(bullet => {
    return <li key={bullet}>{bullet}</li>;
  });
  
  return (
    <div className="extras-list">
      <h3>{title}</h3>
      <ul>
        {listItems}
      </ul>
    </div>
  );
};

export default ExtrasList;
