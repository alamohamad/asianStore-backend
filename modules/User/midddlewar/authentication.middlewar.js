const jwt=require('jsonwebtoken');

const Authenticated=(req,res,next)=>{
    const token=req.headers.token;

    if(token){
        try{
            const user=jwt.verify(token,'mySecret')
            next();
        }catch(e){
            res.json({
                error:'Invalid token'
            })
        }
    }else{
        res.json({
            error:'token does not exist'
        })    }

}

module.exports={Authenticated}