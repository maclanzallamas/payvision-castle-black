const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const consola = require("consola");
const router = require("./src/router.js");
const api = require("./src/api.js");
const swaggerUi = require('swagger-ui-express');
const {swaggerDocument} = require('./docs/swaggerDocs');

const app = express();
const host = process.env.HOST || "localhost"; //changed as 0.0.0.0 cannot be resolved in the browser using a windows machine.
const port = process.env.PORT || 8080;
app.set("port", port);

async function run() {
  app.disable("x-powered-by"); // QUESTION: any reason is this line here?
  /* The x-powered-by is a header that in sent with every response from this server by default. 
  The header will say that this server is running using the Express framework, which is a security issue, 
  as we can give too much information to a possible attacker.
  (The attacker could search for Express exploits more easily knowing we are using it!) 
  Even the official express documentation recommends using it, or you can even go a step further and use helmet,
  a library that helps you securing your response headers: http://expressjs.com/en/advanced/best-practice-security.html#use-helmet*/
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/", router);
  app.use("/api", api);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  const server = http.createServer(app);

  server.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

run();

module.exports = app; // We do this for testing