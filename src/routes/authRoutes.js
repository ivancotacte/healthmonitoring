import express from 'express';
import { postLogin, getLogin } from '../controllers/loginController.js';
import { postRegister, getRegister } from '../controllers/registerController.js';
const router = express.Router();

router.post('/auth/login', postLogin);
router.post('/auth/register', postRegister);

router.get('/login', getLogin);
router.get('/register', getRegister);

export default router;