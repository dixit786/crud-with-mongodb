const express = require("express");
const {
    updateAccess,
    getAllAccessData,
    deleteAccess
} = require("../controllers/access");

module.exports = app => {
    const router = express.Router();
  
    //Api for update access list as per provided data
    router.put("/update-access/:accessId", updateAccess);

    //Api for access list
    router.get("/", getAllAccessData);

    //Api for delete access
    router.delete("/delete-access/:accessId", deleteAccess);
  
    //Define users route
    app.use('/access', router);
  
}