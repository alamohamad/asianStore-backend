const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);
const { body } = require('express-validator');

const category_name= body('category_name').notEmpty().withMessage('The category name  is required').custom(async (value) => {
    const existingCategory = await db('categories').where('category_name', value).first();
    if (existingCategory) {
      return Promise.reject('Category already exist');
    }
  });


const img = body('img').custom((value, { req }) => {
    if (!req.file) {
      return Promise.reject('The category image is required');
    }
    return true;
  });


const createCategoryValidation=[category_name,img]

module.exports=createCategoryValidation;




