const express=require('express');//fetch the already present instance of express
const router=express.Router();
const passport=require('passport');
//adding controller
const homeController=require('../controllers/home_controller');

router.get('/',passport.checkAuthentication,homeController.home);
// router.use('/admin',require('./users'));
router.use('/users',require('./users'));
module.exports=router;
