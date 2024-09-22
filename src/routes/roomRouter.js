const express = require('express');
const roomController = require('../controllers/roomController');
const {isAdmin , authMiddlware} = require('../middlewares/adminModdleware');
// const upload = require('../middlewares/upload');



const router = express.Router();

router.post('/createRoom', roomController.createRoom );
router.get('/getRooms', roomController.getRooms);
router.put('/updateRoom/:id' , roomController.updateRoom);
router.delete('/deleteRoom/:id' , roomController.deleteRoom);



module.exports = router;