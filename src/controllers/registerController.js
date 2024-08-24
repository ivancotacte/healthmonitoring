import { readData, writeData } from '../database/mongoConnection.js';

async function registerController(req, res) {
    const { firstName, middleName, lastName, birthday, email, password } = req.body;

    if (!firstName || !lastName || !birthday || !email || !password) {
        req.session.error = 'All fields are required.';
        return res.redirect('/register');
    }

    const users = await readData('users');
    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
        req.session.error = 'User already exists';
        return res.redirect('/register');
    }

    await writeData('users', { 
        firstName, 
        middleName, 
        lastName, 
        birthday, 
        email, 
        password,
        healthData: {
            weight: 0,
            height: 0,
            heartRate: 0,
            oxygenSaturation: 0,
        }
    });

    req.session.email = email;
    return res.redirect('/checkinghealth');
}

export default registerController;