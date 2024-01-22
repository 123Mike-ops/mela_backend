const express=require('express')
const router=express.Router();
const Joi=require('joi');

const itemcontroller=require('../controllers/item');
const authcontroller=require('../controllers/auth');
const validation = require('../utils/validation');
const authorize=require('../middlewares/authorize');
const {
  validate
} = require('../middlewares/validation.js')

router.route('/')
      .post(authcontroller.protect,itemcontroller.create)

module.exports=router;