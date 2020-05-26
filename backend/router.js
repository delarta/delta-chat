const router = require("express").Router;

router.get("/", (req, res, next) => {
  res.send("server is up and running")
})