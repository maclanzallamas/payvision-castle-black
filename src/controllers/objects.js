const { players, armPlayer } = require('./players');

const objects = [
  { id: 1, name: "spoon", value: -1 },
  { id: 2, name: "knife", value: -10 },
  { id: 3, name: "sword", value: -20 },
  { id: 4, name: "potion", value: +20 }
];

const createObject = (data, response) => {
  const {
    name,
    value
  } = data;

  if (typeof name !== "string" || typeof value !== "number") {
    return response(400, 'Invalid body, name should be string and value should be number')
  }

  // We always take the last id and add 1
  const objectId = objects.length > 0 ? objects[objects.length - 1].id + 1 : 1;
  const object = { id: objectId, name, value };
  objects.push(object)
  return response(201, object)
}

const getObjectById = (data, response) => {
  let { id } = data;

  try {
    id = parseInt(id);
  } catch (error) {
    return response(400, 'Invalid id. It should be an integer number');
  }

  const object = objects.filter((object) => object.id === id);

  if (object.length >= 1) {
    return response(200, object[0]);
  }
  return response(404, `Object with id ${id} not found`);
}

const upgradeObject = (data, response) => {
  let { id, value } = data;

  if (typeof value !== "number") {
    return response(400, 'Invalid body, value should be number');
  }
  try {
    id = parseInt(id);
  } catch (error) {
    return response(400, 'Invalid id. It should be an integer number');
  }

  const object = objects.filter((object) => object.id === id);

  if (object.length >= 1) {
    object[0].value = value;
    return response(204);
  }
  return response(404, `Object with id ${id} not found`);  
}

const destroyObject = (data, response) => {
  let { id } = data;

  try {
    id = parseInt(id);
  } catch (error) {
    return response(400, 'Invalid id. It should be an integer number');
  }

  let objectExists = false;
  // We remove the object from 3 places, the overall array of available objects, bag and hand of every player that have it.
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id === id) {
      objects.splice(i);
      objectExists = true;
      break;
    }
  }
  players.forEach((player) => {
    player.bag.forEach((item, index) => {
      if (item === id) {
        player.bag.splice(index);
      }
    });
    player.armedWith.forEach((item, index) => {
      if (item === id) {
        player.armedWith.splice(index);
      }
    });
  });
  if (objectExists) {
    return response(200, `Object with id ${id} deleted`);
  }
  return response(404, `Object with id ${id} not found`); 
}

const pickUpObject = (data, response) => {
  // Assuming a random player gets one random item that no other users have
  // First we get the object that are not assigned to anyone
  let allObjectsTakenByPlayers = [];
  players.forEach((player) => {
    allObjectsTakenByPlayers.push(player.bag.concat(player.armedWith))
  });
  allObjectsTakenByPlayers = allObjectsTakenByPlayers.flat();

  // We filter the objects array to get the ones not used and then we take a random one
  const freeObjects = objects.filter((object) => !allObjectsTakenByPlayers.includes(object.id));
  const randomObject = freeObjects[Math.floor(Math.random() * freeObjects.length)];
  const randomPlayer = Math.floor(Math.random() * players.length) + 1;
  
  if (randomObject != undefined && randomPlayer != undefined) {
    return armPlayer({id: randomPlayer, objectId: randomObject}, response);
  }
  return response(404, "There are no objects free");
}

module.exports = {
  createObject,
  getObjectById,
  upgradeObject,
  destroyObject,
  pickUpObject,
}