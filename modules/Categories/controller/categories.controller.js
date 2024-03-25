const { latestProductsList } = require('../../Products/services/products.services');
const { getImageNameById } = require('../../fileManager/fileManger.service/fileManager.service');
const { createCategory, categoriesList, deleteCategory, categoriesCount } = require('../services/categories.services');
const { validationResult } = require('express-validator');

const createCategoryUsingPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors });
  }

  const { category_name } = req.body;
  const img = req.file;

  const result = await createCategory(category_name, img);

  return res.json({
    result: result
  });
}




const getListOfCategoriesUsingGet = async (req, res) => {
    try {
        const categories = await categoriesList();
        
     
        for (const category of categories) {
            const image_name = await getImageNameById(category.img_id); 
            if (image_name) {
                category.image_name = image_name;
            }
        }
        
        return res.json({ result: categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const categoriesCountByGet=async(req,res)=>{
  const result= await categoriesCount();
  return res.json({
      result:result
  });

}

const deleteCategoryUsingDelete = async (req, res) => {
    const { category_id } = req.params;
    const result = await deleteCategory(category_id);
    
    return res.json({
        result: result
    });
};


const getLatestProductsUsingGet=async(req,res)=>{
  const result=await latestProductsList();

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


module.exports = {
  createCategoryUsingPost,getListOfCategoriesUsingGet,deleteCategoryUsingDelete,categoriesCountByGet,getLatestProductsUsingGet
};
