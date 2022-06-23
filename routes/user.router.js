const express = require("express");
const { helloFromUser } = require("../controllers/user.controller");

const router = express.Router();

// router.post("/user-create", createUser);
router.get("/", helloFromUser);
module.exports = router;
