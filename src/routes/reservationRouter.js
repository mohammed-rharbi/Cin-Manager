const express = require('express');
const reservationController = require('../controllers/reservationController');
// const {isAdmin , authMiddlware} = require('../middlewares/adminModdleware');
const {authMiddlware} = require('../middlewares/authMiddleware');
const router = express.Router();





router.post('/createReservation' , authMiddlware , reservationController.createReservation );
// router.get('/allMovies' , movieController.getMovies);
// router.put('/updateMovie/:id' , movieController.updateMovie);
// router.delete('/deleteMovie/:id' , movieController.deleteMovie);

module.exports = router;