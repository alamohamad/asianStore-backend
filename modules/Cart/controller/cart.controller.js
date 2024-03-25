const { validationResult } = require("express-validator");
const { updateCartItemQuantity, deleteItem, cartItemsList, addToCart } = require("../services/cart.services");
const { getImageNameById } = require("../../fileManager/fileManger.service/fileManager.service");

const addToCartUsingPost = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const user_id = req.headers.user_id;

        const result = await addToCart(user_id, product_id, quantity); 

        return res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};



const getCartItemsByGet = async (req, res) => {
    try {
        const user_id = req.headers.user_id;
        const cartItems = await cartItemsList(user_id);


        for (const item of cartItems) {
            const image_name = await getImageNameById(item.img_id); 


            if (image_name) {
                item.image_name = image_name;
            }
        }
        return res.json({ result: cartItems });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteItemUsingDelete = async(req,res) => {
    const {cart_item_id} = req.params;
    console.log(req.params)
    const result = await deleteItem(cart_item_id);
    
    return res.json({
        result: result
    });
};



const updateCartItemQuantityByPut = async (req, res) => {
    const { cart_item_id } = req.params;
    const { quantity } = req.body;
  
    try {
      const result = await updateCartItemQuantity(cart_item_id, quantity);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error updating quantity:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports={addToCartUsingPost,getCartItemsByGet,deleteItemUsingDelete,updateCartItemQuantityByPut}