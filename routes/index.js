//Import auth middleware for authentication
const auth = require("../middleware/auth");
const { permission } = require("../middleware/permission");

module.exports = (app) => {
  try {

    //Import auth route
    require("./auth")(app)

    //Check authentication middleware
    app.use(auth)

    //Check logged user has a permission of users module or not
    app.use(permission("users"))
    //Import user route
    require("./UserRoutes")(app)

    //Check logged user has a permission of access module or not
    app.use(permission("access"))
    //Import access route
    require("./access")(app)

  } catch (error) {
    console.log(`error :>> `, error);
  }
};