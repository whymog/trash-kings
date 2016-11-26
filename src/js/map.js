var WorldMap = function(map) {
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

var testMapArray =
[
  ['t', 't', 'g', 'g', 'g', 'g', 'g', 'r', 't', 't'],
  ['t', 't', 'g', 'g', 'g', 'g', 'g', 'r', 'H', 't'],
  ['t', 't', 't', 'g', 'g', 'g', 'g', 'r', 'H', 'g'],
  ['t', 'g', 't', 'g', 'g', 'g', 'g', 'r', 'H', 'g'],
  ['g', 'g', 'g', 'g', 'g', 'g', 'g', 'r', 'g', 'g'],
  ['g', 'Bm', 'Bm', 'g', 'g', 'g', 'g', 'r', 'g', 'g'],
  ['g', 'Bm', 'Bm', 'g', 'g', 'g', 'g', 'r', 'g', 'g'],
  ['g', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'],
  ['g', 'r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
  ['g', 'r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'],
];

var testMap = new Map(testMapArray);
console.log(testMap);
console.log('ASDF');

console.log(testMap);
// console.log(testMap.convertMapToString(testMapArray));
