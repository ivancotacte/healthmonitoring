import { readData, writeData } from '../db/mongoConnection.js';

async function getLogin(req, res) {
    const { email } = req.session;
    const error = req.session.error;
    req.session.error = null;
    res.render('login', { email, error });
}
async function postLogin(req, res) {
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
        res.redirect('/login');
    }
}


export { postLogin, getLogin };