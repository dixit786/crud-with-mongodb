const express = require("express");

//Import some controller functions
const {
  getAllUsers,
  getUserById,
  updateUser,
  updateAll,
  deleteUser,
  updateAllWithDifferentData,

} = require("../controllers/UserController");
const {permission} = require("../middleware/permission");

module.exports = app => {
  const router = express.Router();

  //Api for get all users
  router.get("/", getAllUsers);
  
  //Api for get user by Id
  router.get("/user/:userId", getUserById);
  
  //Api for update user
  router.put("/update-user/:userId", updateUser);
  
  //Api for delete user
  router.delete("/delete-user/:userId", deleteUser);
  
  //Api for update all user with same data
  router.put("/update-all-user", updateAll);
  
  //Api for update users as per provided user data
  router.put("/update-all-user-data", updateAllWithDifferentData);
  
  //Check logged user has a permission of users module or not
  //Define users route
  app.use('/users', permission("users") ,router);

}
