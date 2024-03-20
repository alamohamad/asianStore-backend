const knex = require ('knex');
const knexConfig=require('../../../knexfile');
const db=knex(knexConfig);
const fileCreate=async(oldName,newName,path,folder)=>{
    const file_id=await db('file_manager').insert({
        'old_name':oldName,
        'new_name':newName,
        'path':path,
        'folder_name':folder
    })
    return file_id;
}


const getImageNameById = async (file_id) => { 
    try {
        const { new_name } = await db('file_manager').where('file_id',file_id).first(); 
        return new_name;
    } catch (error) {
        console.error('Error fetching image name:', error);
        return null;
    }
};



module.exports={fileCreate,getImageNameById}