import express from 'express';
import healthController from '../controllers/healthController.js';
const router = express.Router();

router.get('/', (req, res) => {
    const email = req.session.email;
    if (!email) {
        req.session.error = 'Unauthorized access. Please register first.';
        return res.redirect('/register');
    }
    
    const error = req.session.error;
    const success = req.session.success;
    req.session.success = null;
    req.session.error = null;
    res.render('healthCheck', { email, error, success });
});

router.post('/', healthController);

export default router;