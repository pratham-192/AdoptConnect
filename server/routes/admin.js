const express=require('express');//fetch the already present instance of express
const router=express.Router();
const passport=require('passport');
//adding controller
const adminController=require('../controllers/admin_controller');
router.get('/all_admin',adminController.getAllAdmin);
router.get('/all_workers',adminController.getAllWorkers);
router.get('/all_child',adminController.getAllChild);
// router.get('./all_managers',adminController.getAllCaseManagers);
router.use('/adoption_flow',require('./adoptionflow'));
router.post('/addchildtoworker',adminController.addChildtoWorker);
router.post('/deletechildfromworker',adminController.deleteChildfromWorker);
module.exports=router;
