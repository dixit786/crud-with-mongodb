const express = require("express");
const {
  registerUser,
  login
} = require("../controllers/auth");



module.exports = app => {
  const router = express.Router();
  router.post("/register", registerUser);
  router.post("/login", login);

  app.use('/auth', router);

}