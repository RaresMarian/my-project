const connect = require('./dbConnect');
const User = require('../schemas/profileModel');


async function conToUser(user_email, password) {
    const result = await User.findOne({ email: user_email, password: password });
    if (result) {
        return result;
    } else {
        return false;
    }
}

module.exports=conToUser;