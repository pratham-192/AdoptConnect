const express=require('express');//fetch the already present instance of express
const router=express.Router();
const passport=require('passport');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
//adding controller
const childController=require('../controllers/child_controller');

router.post('/create_child',childController.create);
router.post('/update_child',childController.update_details_child);
router.delete('/delete_child',childController.delete_child);



//creation and deletion of child category
router.post('/create_child_category',childController.create_child_category);
router.delete('/delete_child_category',childController.delete_child_category);
router.post('/status_update',childController.statusUpdate);


//get child by id

router.post('/getchild',childController.getChildbyId);

router.get('/get_child_category',childController.get_child_category);

router.post('/document/upload',upload.single('file'),childController.upload);
router.post('/document/download',childController.download);
router.post('/document/files',childController.getFiles);
router.post('/document/files/delete',childController.deleteFile);

module.exports=router;
