import { Router } from 'express';
import {verifyJWT} from '../middleware/auth.middleware.js';
const router = Router();

// Middleware to check if the user is authenticated
router.use(verifyJWT); 

router.get('/', (req, res) => {
    res.render('index', { user: res.locals.user });
});

router.get('/login', (req, res) => {
    res.render('login', { user: res.locals.user });
});

router.get('/register', (req, res) => {
    res.render('signup', { user: res.locals.user });
});

router.get('/about-us', (req, res) => {
    res.render('about-us', { user: res.locals.user });
});

router.get('/contact-us', (req, res) => {
    res.render('contact-us', { user: res.locals.user });
});

router.get('/gallery', (req, res) => {
    res.render('gallery', { user: res.locals.user });
});

router.get('/blog', (req, res) => {
    res.render('blog', { user: res.locals.user });
});

router.get('/georgia', (req, res) => {
    res.render('georgia', { user: res.locals.user });
});

router.get('/apply-online', (req, res) => {
    res.render('apply-online', { user: res.locals.user });
});

router.get('/coming', (req, res) => {
    res.render('coming', { user: res.locals.user });
});

router.get('/universities', (req, res) => {
    res.render('university', { user: res.locals.user });
});

router.get('/georgia-full', (req, res) => {
    res.render('georgia-full', { user: res.locals.user });
});

// 404 route
router.get('*', (req, res) => {
    res.status(404).render('404');
});

export default router;