const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);
const { body } = require('express-validator');

const email = body('email')
  .notEmpty().withMessage('The email is required')
  .isEmail().withMessage('Invalid email format')
  .custom(async (value) => {
    const existingUser = await db('users').where('email', value).first();
    if (existingUser) {
      return Promise.reject('Email already in use');
    }
  });

const user_name = body('user_name')
  .notEmpty().withMessage('The user name is required')
  .custom(async (value) => {
    const existingUsername = await db('users').where('user_name', value).first();
    if (existingUsername) {
      return Promise.reject('User name already in use');
    }
  });

const password = body('password')
  
  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').notEmpty().withMessage('Password is required');

const password2 = body('password2')
  .notEmpty().withMessage('Confirm Password is required.')
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      return Promise.reject('Passwords do not match');
    }
    return true;
  });

const createSignupValidation = [email, password,password2, user_name];


const emailLogin = body('email').notEmpty().withMessage('The email is required')
 const passwordLogin=body('password').notEmpty().withMessage('The password is required')

 const loginValidation=[emailLogin,passwordLogin]




const createEmployeeValidation=[email,user_name,password]







module.exports = { createSignupValidation,loginValidation,createEmployeeValidation };
