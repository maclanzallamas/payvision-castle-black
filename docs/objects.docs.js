
const getObjects = {
  tags: ['Objects'],
  description: "Returns all objects",
  operationId: 'getObjects',
  security: [
    {
      basicAuth: []
    }
  ],
  responses: {
    "200": {
      description: "List of available objects",
      "content": {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                "id": { "type": "number" },
                "name": { "type": "string" },
                "value": { "type": "number" }
              }
            }
          }
        }
      }
    }
  }
}


module.exports = {
  getObjects,
}