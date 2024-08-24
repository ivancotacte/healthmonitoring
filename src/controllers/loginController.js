import { readData, writeData } from '../database/mongoConnection.js';

async function loginController(req, res) {
    const { email, password } = req.body;

    if(email) {
        const users = await readData('users');
        const emailExists = users.some(user => user.email === email);
        if(!emailExists) {
            req.session.error = 'No account found with the provided email address.';
            return res.redirect('/login');
        }

        req.session.email = email;
        return res.redirect('/login');
    } else if (password) {
        console.log(`Email: ${req.session.email}, Password: ${password}`);
        req.session.destroy();
        return res.redirect('/login');
    } else {
        req.session.error = 'Email or password is required.';
        return res.redirect('/login');
    }
}

export default loginController;