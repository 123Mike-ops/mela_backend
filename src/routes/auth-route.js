const express=require('express')
const router=express.Router();
const Joi=require('joi');

const authcontroller=require('../controllers/auth');
const validation = require('../utils/validation');
const authorize=require('../middlewares/authorize');
const {
  validate
} = require('../middlewares/validation.js')

router.route('/')
      .post(validate(validation.user),authcontroller.signup)
router.post('/login',authcontroller.login) 
router.post('/refreshToken',authcontroller.protect,authcontroller.refreshToken)
router.post('/forgotPassword',authcontroller.forgotPassword)
router.patch('/resetPassword/:token',authcontroller.resetPassword)

// router.post('/testAuthrize',authcontroller.protect,authorize("admin",["deleteRole"]),authcontroller.signup)

module.exports=router;

