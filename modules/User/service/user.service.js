const knex=require('knex');
const knexConfig=require('../../../knexfile')
const db=knex(knexConfig)

const signup=async(email,password,user_name,password2)=>{
    try{
        const result=await db('users').insert({
            email:email,
            password:password,
            user_name:user_name,
            password2:password2,
            rule_id:3 //customer


        });
        return { result: true, message: "Welcome to Asia Store!" };

    }catch(err){
        return { result: false, message: "something wrong" };
        


    }


}


const login=async(email,password)=>{
    try {
        const user = await db('users').where('email',email).where('password',password).select('*');
        // console.log(user);
        return user;
    }
     catch(e){
        console.error('Error - not defined email & password:', e);
        return 'An error occurred while : ' + e.message;
       }
}


const usersCount=async()=>{
    try {
        const count = await db('users').count().where('rule_id',3).first();
        return count ;
    } catch (e) {
        console.error('Error counting users:', e);
        return 'error';
    }
}

const usersList=async()=>{
   try{
    const user=await db('users').select('*').where('rule_id',3)
    return user;
   }catch(e){
    return 'error';
   }

}

const deleteUser=async(user_id)=>{
    try {
        const result = await db('users').where({'user_id':user_id}).del();
        return result;
    } catch (e) {
        console.error('Error in Delete category:', e);
        return 'An error occurred while deleting the category: ' + e.message;
    }

}


const employeesList=async()=>{
    try{
     const user=await db('users').select('*').where('rule_id',2)
     return user;
    }catch(e){
     return 'error';
    }
 
 }


 

 const createEmployee=async(email,password,user_name)=>{
    try{
        const user_id=await db('users').insert({
            email:email,
            password:password,
            user_name:user_name,
            rule_id:2 //employee


        });


        await db('users_groups').insert({
            user_id:user_id,
            group_id:2

        })
        return { result: true, message: "Employee added sucessfully" };

    }catch(err){
        return { result: false, message: "something wrong" };
        


    }


}

module.exports={signup,login,usersList,usersCount,deleteUser,employeesList,createEmployee}