const AccessModel = require("../models/Access");

exports.getAccessData = async (id, data) => {
    try {
        return await AccessModel.find();
    } catch (error) {
        throw error
    }
};

exports.updateAccessData = async (id, data) => {
    try {
        return await AccessModel.findByIdAndUpdate(id , data);
    } catch (error) {
        throw error
    }
};

exports.deleteAccess = async (id) => {
    try {
      return await AccessModel.findByIdAndDelete(id);
    } catch (error) {
      throw error
    }
  };