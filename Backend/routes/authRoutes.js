const express = require('express');
const { registerController,loginController ,logoutController ,checkSessionController,updateController } = require ('../controllers/authController');
const { getUserController} =require ('../controllers/getUserController')
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.get('/check-session', checkSessionController);

router.put('/update/:id', updateController);

router.get('/getUser',getUserController)



module.exports = router;
