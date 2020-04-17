const { Router } = require("express");
const api = Router();
const { getPlayers, createPlayer, getPlayerById, armPlayer, killPlayer } = require('./controllers/players');

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

api.get('/players', (req, res) => handle(getPlayers)(req,res));
api.post('/player', (req, res) => handle(createPlayer)(req,res));
api.get('/player/:id', (req, res) => handle(getPlayerById)(req,res));
api.patch('/armPlayer/:id', (req, res) => handle(armPlayer)(req,res));
api.patch('/killPlayer/:id', (req, res) => handle(killPlayer)(req,res));
api.post('/createObject', (req, res) => handle()(req,res));
api.get('/object/:id', (req, res) => handle()(req,res));
api.put('/upgradeObject/:id', (req, res) => handle()(req,res));
api.delete('/object/:id', (req, res) => handle()(req,res));


module.exports = api;
