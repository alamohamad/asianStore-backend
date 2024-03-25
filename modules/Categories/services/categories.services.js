const knex = require('knex');
const knexConfig = require('../../../knexfile');
const { fileCreate } = require('../../fileManager/fileManger.service/fileManager.service');
const db = knex(knexConfig);

const createCategory = async (category_name, img) => {
  try {
    const { originalname, filename, path: imgPath } = img;
    const file_id = await fileCreate(originalname, filename, imgPath, 'uploads/categories');

    await db('categories').insert({
      category_name: category_name,
      img_id: file_id
    });
    const fileData=await db('file_manager').select('new_name').where('file_id',file_id[0])


    return { result: true, fileData,message: "Category added successfully." };
  } catch (err) {
    console.error(err); 
    return { result: false, message: err.message }; 
  }
};



const categoriesList=async()=>{
    try{
        const result = await db('categories').select('*')
        return result
    }catch(error){
        return 'error';
    }
    
}


const deleteCategory=async(category_id)=>{
    try {
        const result = await db('categories').where({'category_id':category_id}).del();
        return result;
    } catch (e) {
        console.error('Error in Delete category:', e);
        return 'An error occurred while deleting the category: ' + e.message;
    }

}


const categoriesCount=async()=>{
  try {
      const count = await db('categories').count().first();
      return count ;
  } catch (e) {
      console.error('Error counting users:', e);
      return 'error';
  }
}

 






module.exports = {
  createCategory,categoriesList,deleteCategory,categoriesCount
};
