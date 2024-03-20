const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);
const { fileCreate } = require('../../fileManager/fileManger.service/fileManager.service');


const addToCart = async (user_id, product_id, quantity) => {
    try {
        const existingCart = await db('carts').where('user_id', user_id).first();

        let cart_id;
        if (!existingCart) {
            const [newCartId] = await db('carts').insert({ user_id });
            cart_id = newCartId;
        } else {
            cart_id = existingCart.cart_id;
        }

        const existingCartItem = await db('cart_items')
            .where({ cart_id, product_id })
            .first();

        if (existingCartItem) {
            await db('cart_items')
                .where({ cart_id, product_id })
                .increment('quantity', quantity);
        } else {
            await db('cart_items').insert({ cart_id, product_id, quantity });
        }

        return true;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw new Error('Failed to add product to cart');
    }
};



const cartItemsList = async (user_id) => {
    try {
    
        const cartItems = await db('cart_items')
        .join('products', 'cart_items.product_id', 'products.product_id')
        .join('carts', 'cart_items.cart_id', 'carts.cart_id')
        .where('carts.user_id', user_id)
        .select('cart_items.*','products.product_id', 'products.price','products.img_id','products.product_name');
            
        // console.log(cartItems)
        return cartItems;
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        throw new Error('Failed to retrieve cart items');
    }
};




const deleteItem = async (cart_item_id) => {
    try {
        const result = await db('cart_items').where({'cart_item_id': cart_item_id}).del();
        return result;
    } catch (e) {
        console.error('Error in Delete product:', e);
        return 'An error occurred while deleting the item: ' + e.message;
    }
};

const updateCartItemQuantity = async (cart_item_id, quantity) => {
    try {
      const cartItem = await db('cart_items').where('cart_item_id', cart_item_id).first();
  
      if (!cartItem) {
        throw new Error('Cart item not found');
      }
  
      await db('cart_items').where('cart_item_id', cart_item_id).update({ quantity: quantity });
  
      return { message: 'Quantity updated successfully' };
    } catch (error) {
      throw error;
    }
  };


  module.exports={addToCart,cartItemsList,
    deleteItem,updateCartItemQuantity}