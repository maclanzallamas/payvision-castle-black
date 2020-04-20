const { getPlayers } = require('./players.docs');
const { getObjects } = require('./objects.docs');

const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'CastleBlack API',
    description: 'Payvision CastleBlack API Docs',
    contact: {
      name: 'Mario Llamas Lanza',
      email: 'mariolanzallamas@gmail.com',
    }
  },
  components: {
    schemas: {},
    securitySchemes: {
      basicAuth: {
        type: 'http',
        scheme: 'basic'
      }
    }
  },
  tags: [
    {
      name: 'Players'
    },
    {
      name: 'Objects'
    }
  ],
  paths: {
    "/api/players": {
      "get": getPlayers
    },
    "/api/objects": {
      "get": getObjects
    }
  }
}

module.exports = {
  swaggerDocument
};