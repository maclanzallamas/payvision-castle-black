const { Router } = require("express");
const api = Router();

// Creating generic functions for managing the services and errors
const successHandler = (response) => (data) => response.json(data);
const errorHandler = (response) => (error, message) => response.status(400).json({ error, message });

// Creation of a generic function to handle all endpoints. This helps to extract the body or params 
// for all the requests and also to have a try catch that will "protect us" returning a 500 error in case something unexpected happens
const handle = (service) => async (request, response) => {
  const data = (request.body instanceof Array) ? request.body : { ...request.body, ...request.params };
  try {
    await service(
      data,
      successHandler(response),
      errorHandler(response),
     );
  } catch (error) {
    console.error(`Unhandled Exception - ${request.url}: `, error);
    console.error(JSON.stringify(data));
    errorHandler(response)('UNHANDLED_EXCEPTION');
  }
};

api.get('/players', (req, res) => handle()(req,res));
api.post('/player', (req, res) => handle()(req,res));
api.get('/player/:id', (req, res) => handle()(req,res));
api.patch('/armPlayer/:id', (req, res) => handle()(req,res));
api.patch('/killPlayer/:id', (req, res) => handle()(req,res));
api.post('/createObject', (req, res) => handle()(req,res));
api.get('/object/:id', (req, res) => handle()(req,res));
api.put('/upgradeObject/:id', (req, res) => handle()(req,res));
api.delete('/object/:id', (req, res) => handle()(req,res));


module.exports = api;
