const express=require('express');//fetch the already present instance of express
const router=express.Router();
const passport=require('passport');
//adding controller
const adminController=require('../controllers/admin_controller');
router.get('/all_admin',adminController.getAllAdmin);
router.get('/all_workers',adminController.getAllWorkers);
router.get('/all_child',adminController.getAllChild);
router.use('adoption_flow',require('./adoptionflow'));
module.exports=router;
