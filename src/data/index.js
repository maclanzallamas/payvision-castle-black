const objects = [
  { id: 1, name: "spoon", value: -1 },
  { id: 2, name: "knife", value: -10 },
  { id: 3, name: "sword", value: -20 },
  { id: 4, name: "potion", value: +20 }
];

const players = [
  { id: 1, name: "Jon Snow", age: 23, health: 100, bag: [1], armedWith: [] },
  { id: 2, name: "Littlefinger", age: 35, health: 100, bag: [2], armedWith: [] },
  { id: 3, name: "Daenerys Targaryen", age: 20, health: 100, bag: [3], armedWith: [] },
  { id: 4, name: "Samwell Tarly", age: 18, health: 100, bag: [4], armedWith: [] }
];

module.exports = {
  objects,
  players
}