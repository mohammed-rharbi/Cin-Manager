const express = require('express');
const RatingController = require('../controllers/ratingController')
const {isCustomer , authMiddlware} = require('../middlewares/authMiddleware');
const router = express.Router();





router.use(authMiddlware , isCustomer);


router.post('/rateMovie' , RatingController.rateMovie );

router.get('/getMovieRatings/:id' , RatingController.getAllMovieRatinges);

router.get('/getMovieRate/:id' , RatingController.getMovieRate);


 

module.exports = router;