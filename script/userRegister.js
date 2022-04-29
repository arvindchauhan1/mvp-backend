const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../config/config.env') })
const connectDatabase = require("../config/database");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel")

const USER_DATA = {
    name: "Arvind Chauhan",
    email: "@gmail.com",
    password: ""
}

// Register a User
const registerUser = catchAsyncErrors(async() => {

    connectDatabase()

    const { name, email, password } = USER_DATA;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'sample id',
            url: "url",
        },
    });

    console.log(user)
    process.exit()
});

registerUser();