const express=require('express');
const passport=require('passport');
const router=express.Router();

const userController=require('../controllers/user_controller');
router.get('/Sign-In',userController.signIn);
router.get('/sign-out',userController.DestroySession);
router.get('/admin/signin',userController.AdminSignIn);
// router.get('/users/Sign-In',userController.AdminsignIn);
router.get('/signup',userController.signup);
router.post('/create',userController.create);
router.get('/profile',userController.profile);
router.post('/createSession',passport.authenticate(
    'local',//local passport session is used
    {failureRedirect:'/users/Sign-In'},
),userController.createSession)

module.exports=router;