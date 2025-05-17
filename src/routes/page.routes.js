import { Router } from 'express';
import {verifyJWT} from '../middleware/auth.middleware.js';
// const router = Router();
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get('/university/:id', async (req, res) => {
    try {
        const universityId = req.params.id;
        const dataPath = path.join(__dirname, '../../public/data.json');
        
        const jsonData = await fs.readFile(dataPath, 'utf8');
        const universities = JSON.parse(jsonData);
        
        const university = universities.find(uni => uni.id === universityId);
        
        if (!university) {
            return res.status(404).render('error', {
                error: 'University not found',
                user: res.locals.user
            });
        }
        
        res.render('universdetails', { 
            university,
            user: res.locals.user 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).render('error', {
            error: 'Error loading university details',
            user: res.locals.user
        });
    }
});

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