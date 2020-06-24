const http = require("http");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  console.log("(" + Date.now() + ")" + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


// questo file è roba tecnica, praticamente ogni volta che si avvia cerca di "ascoltare" su una porta di rete, questo script fa tutto facilmente