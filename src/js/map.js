function WorldMap(map) {
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

WorldMap.prototype.setMap = function(map) {
  var newMap = [];

  for (var i = 0; i < map.length; i ++) {
    var newRow = [];
    for (var j = 0; j < map[i].length; j ++) {
      newRow.push(map[i][j]);
    }
    newMap.push(newRow);
  }

  this.map = newMap;
}

WorldMap.prototype.convertMapToString = function(map) {
  var mapStr = '';

  for (var i = 0; i < map.length; i ++) {
    for (var j = 0; j < map[i].length; j ++) {
      mapStr += map[i][j];
    }

    if (i < map.length -1) {
      mapStr += '\n';
    }
  }

  return mapStr;
}

WorldMap.prototype.convertMapToImages = function(map) {
  var newMapStr = "<div class='graphicalMap'>";

  for (var i = 0; i < map.length; i ++) {
    newMapStr += "<div class='mapRow'>";

    for (var j = 0; j < map[i].length; j++) {
      newMapStr += "<img class='mapTile' src='./img/" + map[i][j] + ".png'>";
    }

    newMapStr += "</div>";
  }

  newMapStr += "</div>";

  return newMapStr;
}

var testMapArray =
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

var testMap = new WorldMap(testMapArray);
console.log(testMap);
console.log('ASDF');

console.log(testMap);
console.log(testMap.convertMapToString(testMapArray));

var mapDisplayElement = $('.mapDisplay');
var mapAsString = testMap.convertMapToString(testMapArray);

console.log(mapAsString);

var mapAsImages = testMap.convertMapToImages(testMapArray);
