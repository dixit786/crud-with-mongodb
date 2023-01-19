const userService = require("../services/UserService");
var ObjectId = require('mongoose').Types.ObjectId;

// Controller to get user by id
exports.getUserById = async (req, res) => {
  try {
    let  query  = [
      {
          "$match" : {
              _id : ObjectId(req.params.userId),
              isActive : true
          }
      },
      {
          "$lookup": {
            "from": "roles",
            "let": {
              "roleId": "$role"
            },
            "pipeline": [
              {
                "$match": {
                  "$expr": {
                    "$eq": [
                      "$$roleId",
                      "$_id"
                    ]
                  }
                }
              },
              {
                "$lookup": {
                  "from": "accesses",
                  "pipeline": [
                    {
                      "$match": {
                        "$expr": {
                          "$eq": [
                            "$$roleId",
                            "$role"
                          ]
                        }
                      }
                    }
                  ],
                  "as": "access"
                }
              },
              {
                "$unwind": "$access"
              }
            ],
            "as": "role"
          }
      },
      {
          "$unwind": "$role"
      }
    ]

    const user = await userService.getUserById(query);
    res.json({ data: user[0], status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Controller for update user by id
exports.updateUser = async (req, res) => {
  try {
    await userService.updateUserById(req.params.userId, req.body);
    res.json({ message: "Update user successfully", status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Controller for delete user by id
exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.updateUserById(req.params.userId, {isActive : false});
    res.json({ message: "Delete user successfully", data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Controller for update all user with same data
exports.updateAll = async (req, res) => {
  try {
    const users = await userService.updateAllUser(req.body);
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Controller for update many user with different data
exports.updateAllWithDifferentData = async (req, res) => {
  try {
    const user = await userService.updateAllUserWithDifferentData(req.body)
    res.json({ user: user, status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

//Controller for get all users data with role and access
exports.getAllUsers = async (req, res) => {
  try {
    //conditions
    var conditions = {
      isActive: true
    };
    if (req.query.search) {

      //or conditions
      conditions['$or'] = [{
        first_name: {
          '$regex': req.query.search,
          '$options': 'i'
        }
      }, {
        last_name: {
          '$regex': req.query.search,
          '$options': 'i'
        }
      }, {
        email: {
          '$regex': req.query.search,
          '$options': 'i'
        }
      }, {
        phone: {
          '$regex': req.query.search,
          '$options': 'i'
        }
      }];
    }
    const users = await userService.getAllUser(conditions);
    res.status(200).send({ data: users });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}
