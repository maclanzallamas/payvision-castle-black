const { Router } = require("express");
const api = Router();
const { getPlayers, createPlayer, getPlayerById, armPlayer, killPlayer } = require('./controllers/players');
const { createObject, getObjectById, upgradeObject, destroyObject } = require('./controllers/objects');
const basicAuth = require('express-basic-auth');

// Creating generic functions for managing the services and errors
const responseHandler = (response) => (statusCode, data) => response.status(statusCode).json(data);

// Creation of a generic function to handle all endpoints. This helps to extract the body or params 
// for all the requests and also to have a try catch that will "protect us" returning a 500 error in case something unexpected happens
const handle = (service) => async (request, response) => {
  const data = (request.body instanceof Array) ? request.body : { ...request.body, ...request.params };
  try {
    await service(
      data,
      responseHandler(response),
     );
  } catch (error) {
    console.error(`Unhandled Exception - ${request.url}: `, error);
    console.error(JSON.stringify(data));
    responseHandler(response)(500,'UNHANDLED_EXCEPTION');
  }
};


// This is of course a bad practice but is enough for this proof of concept. Usually you would have the users in a database or somewhere securely stored.
// I have decided to use a node module (express-basic-auth) instead of building the authentication from scratch (no need to reinvent the wheel).
// By default, this function will return a 401 Unauthorized if no Authorization header is provided or if it is incorrect.
api.use(basicAuth({
  users: {
      'mario': 'mario123',
      'payvision': 'payvision123',
  }
}))

api.get('/players', (req, res) => handle(getPlayers)(req,res));
api.post('/player', (req, res) => handle(createPlayer)(req,res));
api.get('/player/:id', (req, res) => handle(getPlayerById)(req,res));
api.patch('/armPlayer/:id', (req, res) => handle(armPlayer)(req,res));
api.patch('/killPlayer/:id', (req, res) => handle(killPlayer)(req,res));
api.post('/createObject', (req, res) => handle(createObject)(req,res));
api.get('/object/:id', (req, res) => handle(getObjectById)(req,res));
api.put('/upgradeObject/:id', (req, res) => handle(upgradeObject)(req,res));
api.delete('/object/:id', (req, res) => handle(destroyObject)(req,res));


module.exports = api;
