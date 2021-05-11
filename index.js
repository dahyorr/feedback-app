const PORT = process.env.PORT || 5000;
const express = require("express");

const app = express();
app.get("/", (request, response) => {
  console.log(request);
  response.send({ hi: "there" });
});

app.listen(PORT);
