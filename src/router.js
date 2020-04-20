const { Router } = require("express");
const router = Router();

router.get("/health", function(req, res) {
  // res.body = "Up and running";
  // QUESTION: why this endpoint blocks the app?
  /* In every request we need to send a response back from the server. In this case, the res.body is actually not doing anything, not even setting the response body. 
  For doing that we could either use res.send() or res.json() and pass it as an argument.
  We need to use either res.end, res.send or res.json to send a response. In this case we could use res.send("Up and running"), for example*/
  res.send("Up and running");
});

module.exports = router;
