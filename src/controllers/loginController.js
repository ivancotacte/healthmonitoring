async function getLogin(req, res) {
    const { email } = req.session;
    const error = req.session.error;
    req.session.error = null;
    res.render('login', { email, error });
}
async function postLogin(req, res) {}


export { postLogin, getLogin };