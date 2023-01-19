const blogService = require("../services/UserService");
const UserModal = require("../models/Users")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

exports.registerUser = async (req, res) => {
    // Our register logic starts here
    try {
        // Get user input
        const { first_name, last_name, email, phone , password,  role } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name && role && phone)) {
            return res.status(400).send("All input (email, password, first_name, last_name, role) is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await UserModal.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist.");
        }

        //Encrypt user password
        encryptedPassword = password && await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await UserModal.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            role: role
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
};

exports.login = async (req, res) => {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await UserModal.findOne({ email, isActive: true }).lean();

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // save user token
            user.token = token;
                delete user.password
            // user
            return res.status(200).json(user);
        }
       return res.status(400).send({data : "Invalid Credentials"});
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
}