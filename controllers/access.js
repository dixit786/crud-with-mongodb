const AccessService = require("../services/Access");

const allUnique = arr => arr.length === new Set(arr).size;
exports.updateAccess = async (req, res) => {
    try {
        let arr = req.body;

        if (allUnique(arr)) {
            const response = await AccessService.updateAccessData(req.params.accessId, req.body)
            return res.json({ data: response, message: "Access data updated successfully", status: "success" });
        }
        return res.json({ message: "Please enter a unique module in body data", status: "fail" });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Controller for delete access by id
exports.deleteAccess = async (req, res) => {
    try {
      const access = await AccessService.deleteAccess(req.params.accessId);
      res.json({ message: "Delete access data successfully", data: access, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

exports.getAllAccessData = async (req, res) => {
    try {
        const access = await AccessService.getAccessData()
        res.json({ data: access, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};