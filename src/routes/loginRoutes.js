import loginController from '../controllers/loginController.js';
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    const { email } = req.session;
    const error = req.session.error;
    const success = req.session.success;
    req.session.success = null;
    req.session.error = null;
    res.render('login', { email, error, success });
});

router.post('/', loginController)

export default router;