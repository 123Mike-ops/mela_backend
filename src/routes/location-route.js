const express=require('express')
const router=express.Router();
const Joi=require('joi');

const locationcontroller=require('../controllers/location');
const authcontroller=require('../controllers/auth');
const validation = require('../utils/validation');
const authorize=require('../middlewares/authorize');
const {
  validate
} = require('../middlewares/validation.js')

router.route('/')
      .post(authcontroller.protect,locationcontroller.create)

module.exports=router;