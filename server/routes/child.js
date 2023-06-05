const express=require('express');//fetch the already present instance of express
const router=express.Router();
const passport=require('passport');
//adding controller
const childController=require('../controllers/child_controller');

router.post('/create_child',childController.create);
router.post('/update_child',childController.update_details_child);
router.delete('/delete_child',childController.delete_child);



//creation and deletion of child category
router.post('/create_child_category',childController.create_child_category);
router.delete('/delete_child_category',childController.delete_child_category);

module.exports=router;
