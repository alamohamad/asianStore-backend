
const express=require('express');
const { Authenticated } = require('../../User/midddlewar/authentication.middlewar');
const { addToCartUsingPost, getCartItemsByGet, deleteItemUsingDelete, updateCartItemQuantityByPut } = require('../controller/cart.controller');
const router = express.Router();

router.post('/cart/add',addToCartUsingPost)
router.get('/cart/items',getCartItemsByGet)
router.delete('/cart/items/:cart_item_id',Authenticated,deleteItemUsingDelete)
router.put('/cart/items/:cart_item_id',Authenticated,updateCartItemQuantityByPut)

module.exports=router;