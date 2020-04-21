const { players, objects } = require('../data/index');
const { getObjectById } = require('./objects');

const getPlayerById = (id) => players.filter((player) => player.id === id);

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

const getPlayerByIdEndpoint = (data, response) => {
  let {
    id
  } = data;

  try {
    id = parseInt(id);
  } catch (error) {
    return response(400, 'Invalid id. It should be an integer number');
  }

  const player = getPlayerById(id);

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

  const player = getPlayerById(id);
  
  if (player.length < 1){
    return response(404, `We can not find player with id: ${id}`);
  }

  // We assume that only one object can be armed at the same time using this endpoint.
  if (getObjectById(objectId).length < 1) {
    return response(404, `We can not find the object with id: ${objectId}`);
  }
  player[0].bag.push(objectId);
  return response(204)
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

  const player = getPlayerById(id);
  
  if (player.length < 1){
    return response(404, `We can not find player with id: ${id}`);
  }
  player[0].health = 0;

  return response(204);
};

const attack = (data, response) => {
  const {
    attackerId,
    defenderId,
  } = data;

  // We assume that the player will attack with everything that has armed. If it does not have anything it wont do any damage!
  const attacker = getPlayerById(attackerId);
  const defender = getPlayerById(defenderId);

  if (attacker == undefined || attacker.length <= 0) {
    return response (404, `Attacker with id ${attackerId} not found`);
  }
  if (defender == undefined || defender.length <= 0) {
    return response (404, `Defender with id ${attackerId} not found`);
  }

  const objectsAttacker = [];
  attacker[0].bag.forEach((item) => objectsAttacker.push(getObjectById(item))) //Get the objects that the attacker has in the bag
  const sumDamage = objectsAttacker.flat().reduce((total, object) => total += object.value,0);

  if (defender[0].health - sumDamage <= 0) {
    defender[0].health = 0;
    return response(200, `Attacker ${attackerId} has killed player ${defenderId}`);
  }
  // Assuming that a negative will heal the defender.
  defender[0].health -= sumDamage;
  return response(200, `Player ${defenderId} has ${defender[0].health} points of health left`);
}

module.exports = {
  getPlayerById,
  getPlayers,
  createPlayer,
  getPlayerByIdEndpoint,
  armPlayer,
  killPlayer,
  attack,
}
