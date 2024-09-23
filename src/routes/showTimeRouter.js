const express = require('express');
const showtimeController = require('../controllers/showTimeController');
const {authMiddlware} = require('../middlewares/authMiddleware');



const router = express.Router();



router.post('/createShowtime' , showtimeController.createShowTime );
router.get('/allShowtimes' , showtimeController.getAllShowTimes);
router.put('/updateShowtime/:id' , showtimeController.updateShowTime);
router.delete('/deleteShowtime/:id' , showtimeController.deleteShowTime);


module.exports = router;