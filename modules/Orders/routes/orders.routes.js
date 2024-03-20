const express=require('express');
const { Authenticated } = require('../../User/midddlewar/authentication.middlewar');
const { requestOrderUsingPost, getListOfOrdersUsingGet, getOrdersCountByGet, deleteOrderUsingDelete } = require('../controller/orders.controller');
const { createOrdersValidation } = require('../validation/orders.validation');
const { Autherized } = require('../../User/midddlewar/autherization.middlewar');
const router=express.Router();



router.post('/orders',Authenticated,createOrdersValidation,requestOrderUsingPost)
router.get('/orders',Authenticated,Autherized('manage_users'),getListOfOrdersUsingGet)
router.delete('/orders/:order_id',Authenticated,Autherized('manage_users'),deleteOrderUsingDelete)
router.get('/orders/count',Authenticated,Autherized('manage_users'),getOrdersCountByGet)




module.exports=router;