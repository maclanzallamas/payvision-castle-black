const players = [
  { id: 1, name: "Jon Snow", age: 23, health: 100, bag: [1], armedWith: [] },
  { id: 2, name: "Littlefinger", age: 35, health: 100, bag: [2], armedWith: [] },
  { id: 3, name: "Daenerys Targaryen", age: 20, health: 100, bag: [3], armedWith: [] },
  { id: 4, name: "Samwell Tarly", age: 18, health: 100, bag: [4], armedWith: [] }
];

const getPlayers = (data, response) => {
  return response(200, players)
};

const createPlayer = (data, response) => {
  const {
    name,
    age
  } = data;
  // We assume to create a player you only need a name and its age. The id will be automatically generated and it will always start with 100 health and an empty bag

  if (typeof name !== "string" || typeof age !== "number") {
    return response(400, 'Invalid body, name should be string and value should be number')
  }

  // We assume that players is an array that have the ids in order, and players cannot be deleted from the array
  // Then we can get the last ID easily:
  const playerId = players.length > 0 ? players[players.length - 1].id + 1 : 1;
  const player = { id: playerId, name, age, health: 100, bag: [] };
  players.push(player)
  return response(201, player)
};

const getPlayerById = (data, response) => {
  let {
    id
  } = data;

  try {
    id = parseInt(id);
  } catch (error) {
    return response(400, 'Invalid id. It should be an integer number');
  }

  const player = players.filter((player) => player.id === id);

  if (player.length >= 1) {
    return response(200, player[0]);
  }
  return response(404, `Player with ${id} not found`);
};

const armPlayer = (data, response) => {
  let {
    id,
    objectId,
  } = data;

  try {
    id = parseInt(id);
  } catch (error) {
    return response(400, 'Invalid id. It should be an integer number');
  }

  const player = players.filter((player) => player.id === id);
  
  if (player.length < 1){
    return response(404, `We can not find player with id: ${id}`);
  }

  // We assume that only one object can be armed at the same time. So if the player has 3 object that are the same, only the first one will be armed.
  for (let i = 0; i < player[0].bag.length; i++) {
    // We get the first object that we find. Delete it from the array and added to the armed objects
    if (objectId == player[0].bag[i]) {
      player[0].bag.splice(i);
      player[0].armedWith.push(objectId);
      return response(204)
    }
  }

  return response(404, `We can not find object with id: ${objectId} in player's ${id} bag.`);
};

const killPlayer = (data, response) => {
  let {
    id
  } = data;

  try {
    id = parseInt(id);
  } catch (error) {
    return response(400, 'Invalid id. It should be an integer number');
  }

  const player = players.filter((player) => player.id === id);
  
  if (player.length < 1){
    return response(404, `We can not find player with id: ${id}`);
  }
  player[0].health = 0;

  return response(204);
};


module.exports = {
  players,
  getPlayers,
  createPlayer,
  getPlayerById,
  armPlayer,
  killPlayer,
}
