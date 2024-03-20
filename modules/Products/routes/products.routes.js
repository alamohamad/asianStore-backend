const express=require('express');
const router = express.Router();
const { Authenticated } = require('../../User/midddlewar/authentication.middlewar');
const { createProductUsingPost, getListOfProductsUsingGet, deleteProductUsingDelete, getProductsCountByGet, addToCartUsingPost, getCartItemsByGet, deleteItemUsingDelete, updateCartItemQuantityByPut, getProductsTypeUsingGet, getListOfProductsByCategoryUsingGet, getListOfProductByCategoryAndTypeUsingGet } = require('../controller/products.controller');
const { Autherized } = require('../../User/midddlewar/autherization.middlewar');
const { createProductValidation, addToCartValidation } = require('../validation/products.validation');
const multer = require('multer');
const path = require('path');
const { getLatestProductsUsingGet } = require('../../Categories/controller/categories.controller');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/products');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });


router.post('/products',Authenticated,Autherized(['manage_product', 'manage_users']),upload.single('img'),createProductValidation,createProductUsingPost)
router.get('/products',getListOfProductsUsingGet)
router.get('/latestProducts',getLatestProductsUsingGet)
router.delete('/products/:product_id',Authenticated,Autherized(['manage_product', 'manage_users']),deleteProductUsingDelete)
router.get('/products/count',Authenticated,Autherized('manage_users'),getProductsCountByGet)
router.get('/products/type',getProductsTypeUsingGet)
router.get('/products/:category_name',getListOfProductsByCategoryUsingGet)
router.get('/products/:category_name/:product_type',getListOfProductByCategoryAndTypeUsingGet)









module.exports=router;