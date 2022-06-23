const express = require("express");
const { signUp, signIn } = require("../controllers/auth.controller");
const { signupValidator, validate } = require("../middlewares/signup-validator");

const router = express.Router();

router.post("/signup", signupValidator, validate, signUp);
router.post("/signin", signIn);

module.exports = router;
