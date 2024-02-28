const express = require('express');
const userRoute = express.Router();

const bodyParser = require('body-parser');
require('dotenv').config();
const session = require('express-session');
const { SESSION_SECRET } = process.env;

userRoute.use(session({
    secret: SESSION_SECRET,
    resave: false, // Add resave option
    saveUninitialized: true // Add saveUninitialized option
}));

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));

userRoute.use(express.static('public'));
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});
const upload = multer({ storage });
const userController = require('../controllers/userController');



const auth= require('../middlewares/auth')

userRoute.get('/register',auth.isLogout, userController.registerLoad);
userRoute.post('/register', upload.single('image'), userController.register);

userRoute.get('/',auth.isLogout, userController.loadlogin);
userRoute.post('/', userController.login);
userRoute.get('/logout',auth.isLogin, userController.logout);
userRoute.get('/dashboard',auth.isLogin, userController.loadDashboard);

userRoute.get('*', function (req, res) {
    res.redirect('/');
});

module.exports = userRoute;
