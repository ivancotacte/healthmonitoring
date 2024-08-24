import express from 'express';
import authRoutes from './authRoutes.js';
import loginRoutes from './loginRoutes.js';
import registerRoutes from './registerRoutes.js';
import healthRoutes from './healthRoutes.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/checkinghealth', healthRoutes);

router.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

export default router;