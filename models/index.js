const mongoose = require("mongoose");

//configure mongoose
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/CRUD",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    async (err) => {
      if (err) {
        console.log(err);
      } else {
        const UserModal = require("../models/Users");
        const RoleModal = require("../models/Role");
        let adminRoleId = "62680d324c95b4934ba37d3b";
        let userRoleId = "625ee5fc1755c03a7d95b238"
        const role = await RoleModal.find();
        if (role.length >  0) {
            return;
        }
        let  roles = [
            {
                roles : "Admin",
                id = new ObjectId(adminRoleId)
            },
            {
                roles : "User",
                id = new ObjectId(userRoleId)
            }
        ]
        RoleModal.create(roles)

        // let superAdmin = {
        //     first_name : "Dixit",
        //     last_name: "Chotaliya",
        //     email : "dixitchotaliya05@gmail.com",

        // }
        // await UserModel.create()
        console.log("Connected to MongoDB");
      }
    }
  );

