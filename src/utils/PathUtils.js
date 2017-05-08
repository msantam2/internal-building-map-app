import _ from 'lodash';
import { DELTAS } from './Constants';

export const findStepsOfPath = (startCoord, endCoord, dimensions) => {
  let start = parseCoord(startCoord);
  let end = parseCoord(endCoord);
  let path = [start]; 
  let visited = { [start]: true }; 

  while (!(endFound(start, end))) {
    let unvisitedNeighbors = findUnvisitedNeighbors(start, visited, dimensions);

    for (let neighbor of unvisitedNeighbors) {
      if (endFound(neighbor, end)) {
        start = neighbor;
        break;
      } else {
        start = neighbor;
      }
    }

    visited[start] = true; 
    path.push(start); 
  }

  return path; 
};

// may be multiple sides: think diagonal
export const findSidesToHighlight = data => {

};

// function declarations below enable function hoisting
function parseCoord(coord) {
  let xAndY = coord.split(", ");
  let x = parseInt(xAndY[0].slice(1), 10);
  let y = parseInt(xAndY[1].slice(0, -1), 10);
  return [x, y];
}

function findUnvisitedNeighbors(coord, visited, dimensions) {
  let neighbors = []; 
  DELTAS.forEach(delta => {
    neighbors.push([coord[0] + delta[0], coord[1] + delta[1]]);
  });
  
  return neighbors.filter(neighbor => {
    return inBounds(neighbor, dimensions) && !(visited[neighbor]);
  });
}

function inBounds(coord, dimensions) {
  let [x, y] = coord; 
  return ((x >= 0 && x < dimensions) && (y < 0 && y >= -dimensions)); 
}

function endFound(coord1, coord2) {
  return _.isEqual(coord1, coord2); 
}

