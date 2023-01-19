var jwt = require('jsonwebtoken');

module.exports = {

    /**
     * To check permission of logged user for particular module
     * @param {String} module 
     * @returns Middleware to check permission of logged user
     */
    permission: (module) => {
        return async (req, res, next) => {
            if (!req.user) {
                return res.status(401).send('Not Authorized!');
            }

            //Admin has a full rights of any module
            if (req.user?.role?.role == "Admin") {
                return next();
            }

            //Define variable for permission
            const hasPermission = req.user?.role && req.user?.role?.access 
            &&  req.user?.role?.access?.access_array.includes(module);

            if (!hasPermission) {
                return res.status(403).send('You do not have permission!');
            } 
            return next();
        }
    }
}