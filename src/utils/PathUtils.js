import _ from 'lodash';
import { DELTAS, DELTA_DIRECTIONS } from './Constants';

export const findStepsOfPath = (startCoord, endCoord, dimensions) => {
  let start = parseCoord(startCoord);
  let end = parseCoord(endCoord);
  let path = [start]; 
  let visited = { [start]: true }; 

  while (!(endFound(start, end))) {
    let unvisitedNeighbors =
      findUnvisitedNeighbors(start, visited, dimensions);

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

export const findSidesToHighlight = path => {
  let sidesToHighlight = {}; 
  let firstStep;
  let nextStep;
  let side; 

  for (let i = 0; i < path.length - 1; i++) {
    firstStep = path[i];
    nextStep = path[i + 1];
    side = findDirection(firstStep, nextStep);
    switch (side) {
      case "up":
        sidesToHighlight[firstStep] = sidesToHighlight[firstStep] || {};
        sidesToHighlight[firstStep]["borderLeft"] = "4.5px dashed red";
        break;  
      case "right":
        sidesToHighlight[firstStep] = sidesToHighlight[firstStep] || {};
        sidesToHighlight[firstStep]["borderBottom"] = "4.5px dashed red";
        break;
      case "down":
        sidesToHighlight[nextStep] = sidesToHighlight[nextStep] || {};
        sidesToHighlight[nextStep]["borderLeft"] = "4.5px dashed red";
        break;  
      case "left":
        sidesToHighlight[nextStep] = sidesToHighlight[nextStep] || {};
        sidesToHighlight[nextStep]["borderBottom"] = "4.5px dashed red";
        break;  
      default:
        return;   
    }
  }

  return sidesToHighlight; 
};

// function declarations below enable function hoisting
export function parseCoord(coord) {
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

function findDirection(firstStep, nextStep) {
  let xDelta = nextStep[0] - firstStep[0];
  let yDelta = nextStep[1] - firstStep[1];
  let deltas = [xDelta, yDelta];
  return DELTA_DIRECTIONS[deltas]; 
}
