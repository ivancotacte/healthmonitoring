import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js'; 
import session from 'express-session';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/', authRoutes);

app.get('/', (req, res) => {
    return res.redirect('/login');
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});