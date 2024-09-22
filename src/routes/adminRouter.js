const express = require('express');
const adminController = require('../controllers/adminControlle');
const {isAdmin , authMiddlware} = require('../middlewares/adminModdleware');



const router = express.Router();

// router.use(authMiddlware , isAdmin);

router.post('/CreateAdmin', adminController.RegisterAdmin );




module.exports = router;