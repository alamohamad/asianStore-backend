const { validationResult } = require("express-validator");
const { requestOrder, ordersList, ordersCount, deleteOrder } = require("../services/orders.service");


const requestOrderUsingPost=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors: errors.array()})
    }


    const user_id = req.headers.user_id;
    const{address,phone_number}=req.body;
    const result= await requestOrder(address,phone_number,user_id);
    return res.json({
        result:result
    })
}


const getListOfOrdersUsingGet=async(req,res)=>{
    try {
        const products = await ordersList();
        
     
        return res.json({ result: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }



}




const deleteOrderUsingDelete = async (req, res) => {
    const { order_id } = req.params;
    const result = await deleteOrder(order_id);
    
    return res.json({
        result: result
    });
};


const getOrdersCountByGet=async(req,res)=>{
    const result=await ordersCount();

    return res.json({
        result:result

    })

}


module.exports={requestOrderUsingPost,getListOfOrdersUsingGet,getOrdersCountByGet,deleteOrderUsingDelete}



