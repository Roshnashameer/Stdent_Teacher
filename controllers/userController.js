const users = require("../models/userModel")
const jwt = require('jsonwebtoken');


exports.signUp = async (req, res) => {
    const { userName, email, password, role } = req.body;

    try {

        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(400).json("User already exisits.");
        } else {
            const newUser = new users({
                userName, email, password, role
            });

            await newUser.save();
            return res.status(200).json({Message:"Success",user:newUser});
        }
    } catch (err) {
        return res.status(500).json(`Create API failed: ${err}`);
    }
};
//login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existUser = await users.findOne({ email, password });

        if (existUser) {
            const token = jwt.sign({ _id: existUser._id, role: existUser.role }, "supersecretkey123");
            // console.log(token);

            return res.status(200).json({
                user: existUser,
                token
            });

        } else {
            return res.status(404).json("Incorrect email and password");
        }
    } catch (err) {
        return res.status(500).json(`Login API failed: ${err}`);
    }
};
// get student list
exports.getStudents = async (req, res) => {

    try {
        // Adding Pagination 
        const limitValue = req.query.limit || 3;
        const skipValue = req.query.skip || 0;
        const userArray = await users.find({ role: "student" })
            .limit(limitValue).skip(skipValue);

        if (userArray && userArray.length > 0) {
            res.status(200).json(userArray);
        } else {
            res.status(404).json("No Students ");
        }

    }
    catch (err) {
        return res.status(401).json(`User get API failed: ${err}`);
    }

}
// Edit user
exports.edit = async (req, res) => {
    const { userName, email } = req.body
    const { _id } = req.params

    try {
        const selectedUser = await users.findOne({ _id });

        if (selectedUser) {
            selectedUser.userName = userName;
            selectedUser.email = email;


            await selectedUser.save();
            return res.status(200).json(selectedUser);
        } else {
            return res.status(404).json(`${userName} not found`);
        }
    } catch (err) {
        return res.status(500).json(`Edit  API failed: ${err}`);
    }


}
// delete user
exports.delete = async (req, res) => {
    const { _id } = req.params
    try {
        const response = await users.deleteOne({ _id })
        if (response) {
            res.status(200).json("Student deleted")
        }

    }
    catch (err) {
        return res.status(401).json(` Delete API failed: ${err}`);
    }

}
// logined user
exports.getAuthUser = async (req, res) => {


    try {

        const id = req.payload
        const user = await users.findById(id);
        res.send(user);
        // console.log(user)

    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }


};
// Accept User
exports.accept = async (req, res) => {

    const { _id } = req.params

    try {
        const selectedUser = await users.findOne({ _id });

        if (selectedUser) {
            selectedUser.status = "accepted";
            await selectedUser.save();
            return res.status(200).json("accepted");
        } else {
            return res.status(404).json(`Unauthorized`);
        }
    } catch (err) {
        return res.status(500).json(`Accept API failed: ${err}`);
    }


}

// Reject User
exports.reject = async (req, res) => {

    const { _id } = req.params

    try {
        const selectedUser = await users.findOne({ _id });

        if (selectedUser.role === "student") {
            selectedUser.status = "Rejected";
            await selectedUser.save();
            return res.status(200).json("Rejected");
        } else {
            return res.status(404).json(`Unauthorized`);
        }
    } catch (err) {
        return res.status(500).json(`Reject API failed: ${err}`);
    }

}


