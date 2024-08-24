import express from 'express';
import registerController from '../controllers/registerController.js';
const router = express.Router();

router.get('/', (req, res) => {
    const { email } = req.session;
    const error = req.session.error;
    const success = req.session.success;
    req.session.success = null;
    req.session.error = null;
    res.render('register', { email, error, success });
});

router.post('/', registerController)

export default router;