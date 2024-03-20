const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);
const { fileCreate, getImageNameById } = require('../../fileManager/fileManger.service/fileManager.service');


const createProduct= async(product_name,product_type,price,quantity,img,product_category)=>{
    try {
        const { originalname, filename, path: imgPath } = img;
        const file_id = await fileCreate(originalname, filename, imgPath, 'uploads/products');
        
        const category_id=db('categories').select('category_id').where('category_name',product_category)
        // console.log(category_id)
        await db('products').insert({
          product_name:product_name,
          product_type:product_type,
          price:price,
          quantity:quantity,
          img_id:file_id,
          category_id:category_id
            
        });
    
        return { result: true, message: "Product added successfully."};
      } catch (err) {
        console.error(err); 
        return { result: false, message: err.message }; 
      }

    }



   

    const itemsPerPage = 5;

    const productsList = async (page) => {
      try {
        const offset = (page - 1) * itemsPerPage;
    
        const products = await db('products')
          .orderBy('product_id', 'desc')
          .limit(itemsPerPage)
          .offset(offset);
    
        const totalProductsCount = await db('products').count('*').first();
    
        const totalProducts = parseInt(totalProductsCount['count(*)']); 
    
        const totalPages = Math.ceil(totalProducts / itemsPerPage);
   
    
        return { products, totalPages };
      } catch (error) {
        throw error;
      }
    };
    


    const productsCount=async()=>{
      try{
          const result=await db('products').count().first();
          return result
      }
      catch(error){
          return 'error'
      }
  }
    const deleteProduct=async(product_id)=>{
        try {
            const result = await db('products').where({'product_id':product_id}).del();
            return result;
        } catch (e) {
            console.error('Error in Delete product:', e);
            return 'An error occurred while deleting the product: ' + e.message;
        }
    }




    const latestProductsList=async()=>{
        try{
            const result=await db('products').select('*').orderBy('product_id','desc').limit(6)
            return result
        }catch(error){
            return 'error'
        }
    }

    
    const productsTypes=async()=>{
        try{
            const result = await db('products').distinct('product_type');
            return result
        }catch(error){
            return 'error'

        }
    }




    const getListOfProductsByCategory = async (category_name) => {
        try {
          const result = await db('products')
            .join('categories', 'products.category_id', 'categories.category_id')
            .where('categories.category_name', category_name)
            .select('products.*').orderBy('product_id','desc'); 
          
          return result;
        } catch (error) {
          throw new Error('Error fetching products by category name');
        }
      };


      const listOfProductsByCategoryAndType=async(category_name,product_type)=>{
        try {
            const result = await db('products')
              .join('categories', 'products.category_id', 'categories.category_id')
              .where('categories.category_name', category_name).where('products.product_type',product_type)
              .select('products.*').orderBy('product_id','desc'); 
            
            return result;
          } catch (error) {
            throw new Error('Error fetching products by category name');
          }

      }
    
  

  
    module.exports={createProduct,productsList,deleteProduct,
        productsCount,latestProductsList,productsTypes,getListOfProductsByCategory,listOfProductsByCategoryAndType}