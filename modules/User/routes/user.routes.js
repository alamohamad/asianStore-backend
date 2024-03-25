const express=require('express');
const { createSignupValidation, loginValidation, createEmployeeValidation } = require('../validation/user.validation');
const { userSignupByPost, userLoginByPost, listOfUsersByGet, usersCountByGet, deleteUserUsingDelete, listOfEmployeesByGet, createEmployeeUsingPost, userInfoUsingGet } = require('../controller/user.contrller');
const { Authenticated } = require('../midddlewar/authentication.middlewar');
const { Autherized } = require('../midddlewar/autherization.middlewar');
const router=express.Router();

router.post('/signup',createSignupValidation,userSignupByPost)
router.post('/login',loginValidation,userLoginByPost)

router.get('/users/count',Authenticated,Autherized('manage_users'),usersCountByGet)

router.get('/users/customers',Authenticated,Autherized('manage_users'),listOfUsersByGet)

router.delete('/users/:user_id',Authenticated,Autherized('manage_users'),deleteUserUsingDelete)
router.post('/users',Authenticated,Autherized('manage_users'))

router.get('/users/employees',Authenticated,Autherized('manage_users'),listOfEmployeesByGet)
router.post('/users/employees',Authenticated,Autherized('manage_users'),createEmployeeValidation,createEmployeeUsingPost)
router.get('/users/userInfo',Authenticated,userInfoUsingGet)









module.exports=router;