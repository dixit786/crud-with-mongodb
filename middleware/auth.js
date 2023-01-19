const UserModel = require("../models/Users");
const jwt = require("jsonwebtoken");
var ObjectId = require('mongoose').Types.ObjectId;

const config = process.env;

/**
 * Middleware to check authentication token
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @returns To check whether user is loggedIn or not
 */
const verifyToken = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.TOKEN_KEY);
        console.log(decoded);
        let  query  = [
            {
                "$match" : {
                    _id : ObjectId(decoded.user_id),
                    email: decoded.email,
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
        
        const user = await UserModel.aggregate(query)
        console.log(user);
        req.user = user[0] || null;
    } catch (err) {
      console.log("================== Verify token error ====================");
      console.log(err);
      console.log("==========================================================");
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;