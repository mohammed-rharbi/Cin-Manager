const express = require('express');
const adminController = require('../controllers/adminControlle');
const {authMiddlware , isAdmin} = require('../middlewares/authMiddleware');



const router = express.Router();

router.use(authMiddlware , isAdmin);

router.post('/createAdmin', adminController.RegisterAdmin );
router.put('/updateAdmin/:id' , adminController.updateAdmin);
router.delete('/deleteAdmin/:id' , adminController.deleteAdmin);




module.exports = router;