const express = require('express');
const { registerController,loginController ,logoutController ,checkSessionController } = require ('../controllers/authController');
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.get('/check-session', checkSessionController);



module.exports = router;
