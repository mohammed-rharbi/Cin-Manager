const express = require('express');
const FavoriteController = require('../controllers/favoriteController')
const {isCustomer , authMiddlware} = require('../middlewares/authMiddleware');
const router = express.Router();





router.use(authMiddlware , isCustomer);


router.post('/addToFavorite' , FavoriteController.addToFavorite );

router.get('/myFavorites' , FavoriteController.getAll);


// router.post('/cancelReservation/:id' , reservationController.cancelReservation );


 

module.exports = router;