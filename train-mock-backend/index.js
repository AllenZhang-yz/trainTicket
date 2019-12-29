const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200);
  res.send("hello express");
  res.end();
});

app.get("/rest", (req, res) => {
  res.json({
    result: 1,
    msg: "hello express"
  });
});

app.listen(5000);
