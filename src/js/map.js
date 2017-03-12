class WorldMap {
  constructor(map) {
    this.legend = [
      { name: 'grass', symbol: 'g' },
      { name: 'trees', symbol: 't' },
      { name: 'house', symbol: 'H' },
      { name: 'building-small', symbol: 'Bs' },
      { name: 'building-medium', symbol: 'Bm' },
      { name: 'building-large', symbol: 'Bl' },
      { name: 'road', symbol: 'r' }
    ];
    this.map = map;
  }

  setMap(map) {
    let newMap = [];

    for (let y = 0; y < map.length; y ++) {
      let newRow = [];
      for (let x = 0; x < map[y].length; x ++) {
        newRow.push(map[y][x]);
      }
      newMap.push(newRow);
    }

    this.map = newMap;
  }

  convertMapToString(map) {
    let mapStr = '';

    for (let y = 0; y < map.length; y ++) {
      for (let x = 0; x < map[y].length; x ++) {
        mapStr += map[y][x];
      }

      if (y < map.length -1) {
        mapStr += '\n';
      }
    }

    return mapStr;
  }

  convertMapToImages(map) {
    let newMapStr = `<div class="graphicalMap">`;

    for (let y = 0; y < map.length; y++) {
      newMapStr += `<div class="mapRow">`;

      for (let x = 0; x < map[y].length; x++) {
        newMapStr += `<img class="mapTile" src="./img/${map[y][x]}.png">`;
      }

      newMapStr += `</div>`;
    }

    newMapStr += `</div>`;

    return newMapStr;
  }
}

// Test code below - this should eventually be moved to a separate file
// if I end up deciding to use the map after all (not lookin' too likely atm)

const testMapArray =
[
  ['t', 't', 'g', 'g', 'g', 'g', 'g', 'r', 't', 't'],
  ['t', 't', 'g', 'g', 'g', 'g', 'g', 'r', 'H', 't'],
  ['t', 't', 't', 'g', 'g', 'g', 'g', 'r', 'H', 'g'],
  ['t', 'g', 't', 'g', 'g', 'g', 'g', 'r', 'H', 'g'],
  ['g', 'g', 'g', 'g', 't', 't', 'g', 'r', 'g', 'g'],
  ['g', 'Bm', 'Bm', 'g', 'g', 'g', 'g', 'r', 'g', 'g'],
  ['g', 'Bm', 'Bm', 'g', 'g', 'g', 'g', 'r', 'g', 'g'],
  ['t', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'],
  ['t', 'r', 't', 't', 'g', 'H', 'g', 'H', 'g', 'g'],
  ['g', 'r', 'g', 't', 't', 'g', 'g', 'g', 'g', 'g'],
];

const testMap = new WorldMap(testMapArray);
console.log(testMap);
console.log('ASDF');

console.log(testMap);
console.log(testMap.convertMapToString(testMapArray));

const mapDisplayElement = $('.mapDisplay');
let mapAsString = testMap.convertMapToString(testMapArray);

console.log(mapAsString);

let mapAsImages = testMap.convertMapToImages(testMapArray);
