const express=require('express')
const router=express.Router();
const roleController=require('../controllers/role');
const authController=require('../controllers/auth');
const authorize=require('../middlewares/authorize');
const validation = require('../utils/validation');
const {
  validate
} = require('../middlewares/validation.js')

router.post('/assign',authController.protect,validate(validation.userRole),authorize("admin",["assignRole"]),roleController.assignRole);
router.get('/',authController.protect,authorize("admin",["getRoles"]),roleController.read);


module.exports=router;