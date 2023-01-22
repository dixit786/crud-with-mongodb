//Import auth middleware for authentication
const auth = require("../middleware/auth");
const { permission } = require("../middleware/permission");

module.exports = (app) => {
  try {

    //Import auth route
    require("./auth")(app)

    //Check authentication middleware
    app.use(auth)

    //Import user route
    require("./UserRoutes")(app)

    //Import access route
    require("./access")(app)

  } catch (error) {
    console.log(`error :>> `, error);
  }
};