const { body} = require('express-validator');


    const product_name=body('product_name').notEmpty().withMessage('product name is required');
    const product_type=body('product_type').notEmpty().withMessage('product type is required');
    const product_category=body('product_category').notEmpty().withMessage('product category is required');
    const price =body('price').notEmpty().withMessage('price is required');
    const quantity=body('quantity').notEmpty().withMessage('quantity is required');
    
    const img = body('img').custom((value, { req }) => {
      if (!req.file) {
        return Promise.reject('The product image is required');
      }
      return true;
    });

    const createProductValidation=[product_name,product_type,price,quantity,img,product_category]


    const productId = body('product_id').notEmpty().withMessage('Product ID is required');
    const quantityItem = body('quantity').notEmpty().withMessage('Quantity is required');
    
    const addToCartValidation = [productId, quantityItem];






    module.exports={createProductValidation,addToCartValidation}

