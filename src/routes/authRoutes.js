import express from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
const router = express.Router();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'name', 'emails']
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    const googleUser = req.user;

    console.log('Google Profile Information:');
    console.log(`ID: ${googleUser.id}`);
    console.log(`Display Name: ${googleUser.displayName}`);
    console.log(`Name: ${googleUser.name.givenName} ${googleUser.name.familyName || ''}`);
    console.log(`Emails: ${googleUser.emails.map(email => email.value).join(', ')}`);

    return res.redirect('/login');
});

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    const facebookUser = req.user;

    console.log('Facebook Profile Information:');
    console.log(`ID: ${facebookUser.id}`);
    console.log(`Display Name: ${facebookUser.displayName}`);
    console.log(`Emails: ${facebookUser.emails.map(email => email.value).join(', ')}`);

    return res.redirect('/login');
});

export default router;