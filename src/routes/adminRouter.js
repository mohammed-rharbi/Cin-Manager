const express = require('express');
const adminController = require('../controllers/adminControlle');
const {isAdmin , authMiddlware} = require('../middlewares/adminModdleware');



const router = express.Router();

// router.use(authMiddlware , isAdmin);

router.post('/CreateAdmin', adminController.RegisterAdmin );
router.put('/updateAdmin/:id' , adminController.updateAdmin);
router.delete('/deleteAdmin/:id' , adminController.deleteAdmin);




module.exports = router;