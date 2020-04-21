
const getPlayers = {
  tags: ['Players'],
  description: "Returns all players",
  operationId: 'getPlayers',
  security: [
    {
      basicAuth: []
    }
  ],
  responses: {
    "200": {
      description: "List of players",
      "content": {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                "id": { "type": "number" },
                "name": { "type": "string" },
                "age": { "type": "number" },
                "health": { "type": "number" },
                "bag": {
                  "type": "array",
                  "items": { "type": "number" }
                }
              }
            }
          }
        }
      }
    }
  }
}


module.exports = {
  getPlayers,
}