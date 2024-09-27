const express = require('express');
const roomController = require('../controllers/roomController');
const {isAdmin , authMiddlware} = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/upload');
const router = express.Router();

router.use(authMiddlware);

router.get('/getRooms', roomController.getRooms);

router.use(isAdmin);

router.post('/createRoom', roomController.createRoom );
router.put('/updateRoom/:id' , roomController.updateRoom);
router.delete('/deleteRoom/:id' , roomController.deleteRoom);



module.exports = router;