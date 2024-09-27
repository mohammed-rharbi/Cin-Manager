const express = require('express');
const showtimeController = require('../controllers/showTimeController');
const {authMiddlware , isAdmin} = require('../middlewares/authMiddleware');



const router = express.Router();

router.use(authMiddlware);

router.get('/getShowTimeSeats/:id', showtimeController.getSeats);
router.get('/allShowtimes' , showtimeController.getAllShowTimes);


router.use(isAdmin);

router.post('/createShowtime' , showtimeController.createShowTime );
router.put('/updateShowtime/:id' , showtimeController.updateShowTime);
router.delete('/deleteShowtime/:id' , showtimeController.deleteShowTime);



module.exports = router;