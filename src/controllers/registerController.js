import { readData, writeData } from '../db/mongoConnection.js';

async function getRegister(req, res) {
    const error = req.session.error;
    const success = req.session.success;
    req.session.error = null;
    req.session.success = null;
    res.render('register', { error, success });
}
async function postRegister(req, res) {
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

    req.session.success = 'User registered successfully';
    return res.redirect('/register');
}


export { postRegister, getRegister };