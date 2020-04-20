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
  return response(404, `Object with ${id} not found`);
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
  return response(404, `Object with ${id} not found`);  
}

const destroyObject = (data, response) => {
  let { id } = data;

  try {
    id = parseInt(id);
  } catch (error) {
    return response(400, 'Invalid id. It should be an integer number');
  }

  // Assuming that this only destroy the object from available objects, 
  // but players that have the object currently in their bags or armed, will still have the object.

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id == id) {
      objects.splice(i);
      return response(200)
    }
  }
  return response(404, `Object with ${id} not found`); 
}

module.exports = {
  createObject,
  getObjectById,
  upgradeObject,
  destroyObject,
}