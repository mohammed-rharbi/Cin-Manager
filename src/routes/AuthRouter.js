const express = require('express');
const AuthController = require('../controllers/authController');
const {authMiddlware} = require('../middlewares/authMiddleware');



const router = express.Router();


router.post('/register', AuthController.registerUser);

router.post('/login', AuthController.loginUser);

router.post('/logout' , authMiddlware, AuthController.logoutUser);

router.post('/forget' , AuthController.ReqresetPassword);

router.post('/resetPassword/:resetToken' , AuthController.resetPassword);



module.exports = router;