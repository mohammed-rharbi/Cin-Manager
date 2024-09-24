const express = require('express');
const AuthController = require('../controllers/authController');
const {authMiddlware} = require('../middlewares/authMiddleware');



const router = express.Router();


router.post('/register', AuthController.registerUser);

router.post('/login', AuthController.loginUser);

router.post('/logout' , authMiddlware, AuthController.logoutUser);





module.exports = router;