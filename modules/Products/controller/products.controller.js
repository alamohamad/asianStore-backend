const { validationResult } = require("express-validator");
const { createProduct, productsList, deleteProduct, productsCount, productsTypes, getListOfProductsByCategory, listOfProductsByCategoryAndType, productsList2 } = require("../services/products.services");
const { getImageNameById } = require("../../fileManager/fileManger.service/fileManager.service");


const createProductUsingPost=async(req, res)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors });
  }

  const {product_name,product_type,price,quantity,product_category}=req.body;
  const img = req.file;

  const result=await createProduct(product_name,product_type,price,quantity,img,product_category)
    console.log(result)
        return res.json({
            result: result
        });

}


const getListOfProductsUsingGet = async (req, res) => {
    const page = req.query.page || 1;
  
    try {
      const { products, totalPages } = await productsList(page);
  
      for (const product of products) {
        const image_name = await getImageNameById(product.img_id);
        if (image_name) {
          product.image_name = image_name;
        }
      }
  
      return res.json({ products, totalPages });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };




const deleteProductUsingDelete = async (req, res) => {
    const { product_id } = req.params;
    const result = await deleteProduct(product_id);
    
    return res.json({
        result: result
    });
};


const getProductsCountByGet=async(req,res)=>{
    const result=await productsCount();

    return res.json({
        result:result

    })

}


const getProductsTypeUsingGet=async(req,res)=>{
    const result=await productsTypes();

    return res.json({
        result:result

    })

}


const getListOfProductsByCategoryUsingGet = async (req, res) => {
    
      const { category_name } = req.params;
      const result= await getListOfProductsByCategory(category_name);
  
      for (const product of result) {
        const image_name = await getImageNameById(product.img_id); 
    
        if (image_name) {
            product.image_name = image_name;
        } 
      }

  
      return res.json({
    result:result
  })
   
  };

const getListOfProductByCategoryAndTypeUsingGet=async(req,res)=>{
    const { category_name } = req.params;
    const{product_type}=req.params;
    const result= await listOfProductsByCategoryAndType(category_name,product_type);

    for (const product of result) {
      const image_name = await getImageNameById(product.img_id); 
  
      if (image_name) {
          product.image_name = image_name;
      } 
    }


    return res.json({
  result:result
})
}



module.exports={createProductUsingPost,getListOfProductsUsingGet,
    deleteProductUsingDelete,getProductsCountByGet
    ,getProductsTypeUsingGet,getListOfProductsByCategoryUsingGet,getListOfProductByCategoryAndTypeUsingGet}