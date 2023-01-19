const mongoose = require("mongoose");
var ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');

//configure mongoose
console.log(process.env.MONGODB_URI || "mongodb://localhost:27017/CRUD");
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/Test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    async (err) => {
      if (err) {
        console.log(err);
      } else {
          const RoleModal = require("../models/Role");
          let adminRoleId = "62680d324c95b4934ba37d3b";
        let userRoleId = "625ee5fc1755c03a7d95b238"
        const role = await RoleModal.find();

        if (role.length ==  0) {
            let  roles = [
                {
                    role : "Admin",
                    _id : ObjectId(adminRoleId)
                },
                {
                    role : "User",
                    _id : ObjectId(userRoleId)
                }
            ]
            await RoleModal.create(roles)
            console.log("Default role is inserted");
        }
        const UserModal = require("../models/Users");
        const userData = await UserModal.find();
        if (userData.length == 0) {
            let users = [
                {
                    first_name : "Dixit",
                    last_name: "Chotaliya",
                    email : "dixitchotaliya05@gmail.com",
                    password:await bcrypt.hash("dixit", 10),
                    phone: "+917359259628",
                    role : ObjectId(adminRoleId)
                },
                {
                    first_name : "Meet",
                    last_name: "Darji",
                    email : "meet@gmail.com",
                    password:await bcrypt.hash("meet", 10),
                    phone: "+845484484848",
                    role : ObjectId(userRoleId)
                }
            ] 
            await UserModal.create(users);
            console.log("Default user is inserted");
        }

        const AccessModal = require("../models/Access");
        let accessData = await AccessModal.find();
        if (accessData.length == 0) {
            const accessInitialData = [
                {
                    role : ObjectId(adminRoleId),
                    access_array: [ 
                        "users", 
                        "role",
                        "access"
                    ]
                },
                {
                    role : ObjectId(userRoleId),
                    access_array: [ 
                        "users", 
                        "role"
                    ]
                }
            ]
            await AccessModal.create(accessInitialData)
        }
        console.log("All Data Addedd Successfully");
        process.exit();
      }
    }
  );

