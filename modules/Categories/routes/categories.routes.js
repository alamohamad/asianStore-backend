const express = require('express');
const router = express.Router();
const { Authenticated } = require('../../User/midddlewar/authentication.middlewar');
const { Autherized } = require('../../User/midddlewar/autherization.middlewar');
const createCategoryValidation = require('../validation/categories.validation');
const multer = require('multer');
const { createCategoryUsingPost, getListOfCategoriesUsingGet, deleteCategoryUsingDelete, categoriesCountByGet } = require('../controller/categories.controller');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/categories');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


router.post('/categories', Authenticated, Autherized(['manage_product', 'manage_users']), upload.single('img'), createCategoryValidation, createCategoryUsingPost);
router.get('/categories',getListOfCategoriesUsingGet);
router.delete('/categories/:category_id', Authenticated,Autherized(['manage_product', 'manage_users']),deleteCategoryUsingDelete);
router.get('/categories/count',Authenticated,Autherized('manage_users'),categoriesCountByGet)


module.exports = router;
