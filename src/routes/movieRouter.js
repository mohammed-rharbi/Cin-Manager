const express = require('express');
const movieController = require('../controllers/movieController');
const {isAdmin , authMiddlware} = require('../middlewares/adminModdleware');
const upload = require('../middlewares/upload');



const router = express.Router();



router.post('/createMovie' ,upload.single('image') , movieController.createMovie );


module.exports = router;