// Условная БД

var wineBase = [
  {
    name: "Massandra",
    age: 16,
    rating: {}
  },
  {
    name: "Koktebel",
    age: 10,
    rating: {}
  },
  {
    name: "Inkerman",
    age: 5,
    rating: {}
  },
  {
    name: "Magarach",
    age: 3,
    rating: {}
  },
  {
    name: "Satera",
    age: 7,
    rating: {}
  }
];

wineBase = JSON.stringify(wineBase);

function getFromStorage(Constructor) {
  return $.map(JSON.parse(wineBase), function(item) { return new Constructor(item); });
}

function insertToStorage(obj) {
  wineBase = JSON.stringify(obj);
}
