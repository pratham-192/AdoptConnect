const express=require('express');//fetch the already present instance of express
const router=express.Router();
const passport=require('passport');
//adding controller
const childController=require('../controllers/child_controller');

router.post('/create_child',childController.create);
router.post('/update_child',childController.update_details_child);
module.exports=router;
