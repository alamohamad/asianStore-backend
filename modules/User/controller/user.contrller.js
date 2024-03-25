const {validationResult}=require('express-validator');
const { signup, login, usersList, usersCount, deleteUser, employeesList, createEmployee, usersInfo } = require('../service/user.service');
const jwt=require('jsonwebtoken');


const userSignupByPost=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors})
    }
    const{email,password,user_name,password2}=req.body;
    const result= await signup(email,password,user_name,password2);
    return res.json({
        result:result
    })
}


const userLoginByPost=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors})
    }
    const{email,password}=req.body;
    const user=await login(email,password)

    if(user.length > 0){
        const accessToken=jwt.sign({user},'mySecret',{expiresIn:60*60});
        return res.json({
            user:user[0], 
            accessToken:accessToken
        });
    }



    return res.json({
        error: 'Invalid Credential' 
    });

} 

const usersCountByGet=async(req,res)=>{
    const result= await usersCount();
    return res.json({
        result:result
    });

}


const listOfUsersByGet= async(req,res)=>{
    const result= await usersList();
    return res.json({
        result:result
    });

}


const deleteUserUsingDelete = async (req, res) => {
    const { user_id } = req.params;
    const result = await deleteUser(user_id);
    
    return res.json({
        result: result
    });
};

const listOfEmployeesByGet= async(req,res)=>{
    const result= await employeesList();
    return res.json({
        result:result
    });

}



const createEmployeeUsingPost=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors})
    }
    const{email,password,user_name}=req.body;
    const result= await createEmployee(email,password,user_name);
    return res.json({
        result:result
    })
}


const userInfoUsingGet= async(req,res)=>{
    const user_id = req.headers.user_id;
    const result= await usersInfo(user_id);
    return res.json({
        result:result
    });

}
module.exports={userSignupByPost,userLoginByPost,listOfUsersByGet,usersCountByGet,deleteUserUsingDelete,listOfEmployeesByGet,createEmployeeUsingPost,userInfoUsingGet}