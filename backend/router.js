const router = require("express").Router();
const { userLogin, getRoomDataById } = require("./users")

router.get("/", (req, res, next) => {
  res.send("server is up and running")
})

router.post("/user/login", userLogin);


router.get("/room/:roomId", getRoomDataById);

module.exports = router