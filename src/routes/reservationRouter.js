const express = require('express');
const reservationController = require('../controllers/reservationController');
const {isCustomer , authMiddlware} = require('../middlewares/authMiddleware');
const router = express.Router();





router.use(authMiddlware , isCustomer);

router.post('/createReservation' , reservationController.createReservation );
router.post('/cancelReservation/:id' , reservationController.cancelReservation );

router.get('/getAllReservations' , reservationController.getUserReservations);

router.put('/updateReservation/:id' , reservationController.updateReservation);


module.exports = router;