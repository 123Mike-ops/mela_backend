const express=require('express')
const router=express.Router();

const authController=require('../controllers/auth');
const userController=require('../controllers/user');

const authorize=require('../middlewares/authorize');
const validation = require('../utils/validation');
const {
  validate
} = require('../middlewares/validation.js')

router.put('/:id',authController.protect,userController.updateUser);
router.get('/:id',userController.getUser)
router.get('',userController.getUsers)
// router.delete('/:id',authController.protect,userController.deleteUser);



module.exports=router;