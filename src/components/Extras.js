import React from 'react';
import "../stylesheets/Extras.css";
import ExtrasImage from './ExtrasImage';
import ExtrasList from './ExtrasList';
import Schema from '../images/Schema.png';
import PathFinder from '../images/PathFinder.png';

const Extras = () => {
  const notesOnApp = [
    "Created app via Git feature-branching, a solid and step-wise workflow",
    "Fetched data from Rails JSON API, custom created",
    "Used Rails associations to only submit 1 query to the database",
    "Used Axios library for AJAX requests",
    "Harnessed functional programming through React components"
  ];
  
  const futureFeatures = [
    "Dashboard with detailed analytics!",
    "Allow visibility into office vacancies for more efficient staff placement",
    "Show a sped-up walk-through in Augmented Reality, with landmarks",
    "Use this app to completely change the world."
  ];
  
  return (
    <div className="extras">
      <ExtrasImage title={"Schema"} image={Schema} />
      <ExtrasImage title={"Path Algorithm"} image={PathFinder} />
      <ExtrasList title={"Notes on App"} list={notesOnApp} />
      <ExtrasList title={"Future Features"} list={futureFeatures} />
    </div>
  );
};

export default Extras;
