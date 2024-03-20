const Logger=(req,res,next)=>{    
  
    console.log('API was running')
    next();
    }
    
    module.exports=Logger;