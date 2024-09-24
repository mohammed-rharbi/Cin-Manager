const express = require('express');
const reservationController = require('../controllers/reservationController');
const {isCustomer , authMiddlware} = require('../middlewares/authMiddleware');
const router = express.Router();





router.use(authMiddlware , isCustomer);

router.post('/createReservation' , reservationController.createReservation );
// router.get('/allMovies' , movieController.getMovies);
// router.put('/updateMovie/:id' , movieController.updateMovie);
// router.delete('/deleteMovie/:id' , movieController.deleteMovie);

module.exports = router;