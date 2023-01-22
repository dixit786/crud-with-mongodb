const UserModel = require("../models/Users");
var ObjectId = require('mongoose').Types.ObjectId;

/**
 * Function to find all users from db
 * @returns All users
 */
exports.getAllUser = async (query) => {
  try {
    return await UserModel.find(query);
  } catch (error) {
    throw error
  }

};

/**
 * Function to find user by id with role and access
 * @param {Array} query 
 * @returns User data as per provided userId with role and access
 */
exports.getUserById = async (query) => {
  try {
    return await UserModel.aggregate(query);
  } catch (error) {
    throw error
  }

};

/**
 * Function to update user data as per provided userId
 * @param {UserId} id 
 * @param {Object of user data} user 
 * @returns Updated user data
 */
exports.updateUserById = async (id, user) => {
  try {
    return await UserModel.findByIdAndUpdate(id, user);
  } catch (error) {
    throw error
  }

};

/**
 * Function to update many users with same data
 * @param {Object} userData 
 * @returns Updated users data count
 */
exports.updateAllUser = async (userData) => {
  try {
    return await UserModel.updateMany({}, userData);
  } catch (error) {
    throw error
  }

};

/**
 * Function to delete user data as per provided userId
 * @param {UserId} id 
 * @returns Deleted user
 */
exports.deleteUser = async (id) => {
  try {
    return await UserModel.findByIdAndDelete(id);
  } catch (error) {
    throw error
  }
};

/**
 * Function to update different user's data with one DB call
 * @param {Array} dataArr 
 * @returns 
 */
exports.updateAllUserWithDifferentData = async (dataArr) => {
  try {
    return await UserModel.bulkWrite(
      dataArr.map((data) => {
        return ({
          updateOne: {
            filter: { _id: ObjectId(data._id) },
            update: { $set: data },
            upsert: true
          }
        })
      })
    )
  } catch (error) {
    throw error
  }
};


