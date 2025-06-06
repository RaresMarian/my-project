const Profile = require('../schemas/profileModel');

async function createProfile(data) {
    const credential = { name, surname, sex, birth_date, email, password, utente } = data;

    const newUser = new Profile(credential);
    await newUser.save();
    
    return newUser;
}

module.exports = createProfile;
