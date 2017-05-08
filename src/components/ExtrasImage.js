import React from 'react';
import "../stylesheets/ExtrasImage.css";

const ExtrasImage = ({ title, image }) => (
  <div className="extras-image">
    <h3>{title}</h3>
    <img src={image} alt="" />
  </div>
);

export default ExtrasImage;
